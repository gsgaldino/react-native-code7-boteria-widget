import type { PropsWithChildren } from 'react';

import React, { useEffect, useState } from 'react';

import SessionContextProvider from '../context/SessionContext';
import { SessionGateway } from '../gateways/SessionGateway';
import { Session } from '../entities/Session';
import { Observer } from '../entities/Observer';
import { SocketPayload } from '../types';

type SessionProviderProps = PropsWithChildren<{
  sessionGateway: SessionGateway;
}>;

export const SessionProvider = ({
  sessionGateway,
  children,
}: SessionProviderProps) => {
  const [initialSession, setInitialSession] = useState<Session>(
    new Session('')
  );

  useEffect(() => {
    const getInitialSession = async () => {
      const sessionId = await sessionGateway.getCurrent();
      const session = await sessionGateway.subscribe(sessionId);
      sessionGateway.onEndConversation(async () => {
        setInitialSession(await sessionGateway.clearSession());
      });

      session.register(
        new Observer('sendAction', async (data: SocketPayload) => {
          await sessionGateway.sendAction(data);
        })
      );

      session.register(
        new Observer('clearSession', async () => {
          await sessionGateway.clearSession();
          const newSession = await sessionGateway.subscribe('');
          newSession.observers = session.observers;
          setInitialSession(newSession);
        })
      );

      setInitialSession(session);
    };

    getInitialSession();
  }, []);

  return (
    <SessionContextProvider initialSession={initialSession}>
      {children}
    </SessionContextProvider>
  );
};
