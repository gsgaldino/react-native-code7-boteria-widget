import type { PropsWithChildren } from 'react';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

import { Session } from '../entities/Session';

type SessionContextType = {
  session: Session;
  updateState: () => void;
};

const SessionContext = createContext<SessionContextType>({
  session: {} as Session,
  updateState: () => {},
});

export const useSession = () => useContext<SessionContextType>(SessionContext);

type SessionContextProviderProps = PropsWithChildren<{
  initialSession: Session;
}>;

export default function SessionContextProvider({
  children,
  initialSession,
}: SessionContextProviderProps) {
  const isFirstRender = useRef(false);
  const [session, setSession] = useState(initialSession);

  const updateState = () => {
    setSession((prev) => new Session(prev.current));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setSession(initialSession);
  }, [isFirstRender.current, initialSession]);

  return (
    <SessionContext.Provider value={{ session, updateState }}>
      {children}
    </SessionContext.Provider>
  );
}
