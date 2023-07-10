import type { PropsWithChildren } from 'react';
import React, { useState, useRef, useEffect, useCallback } from 'react';

import { Widget } from './components/Widget';
import { Chat } from './components/Chat';

import { ChatConfigurations, Session, MessageList, Observer } from './entities';
import type { ChatConfigurationsType } from './entities/ChatConfigurations';
import type { SocketConnection, Uuid } from './infra';

import type {
  SessionGateway,
  MessageGateway,
  ChatConfigurationsGateway,
  NotificationGateway,
} from './gateways';

import { useDebounce } from './hooks/useDebounce';

import type { Message, SocketPayload } from './types';
import { From, MessageTypes } from './types';
import { Global } from './global';

type IChatComponentProps = PropsWithChildren<{
  configurations: ChatConfigurations;
  ws: SocketConnection;
  sessionGateway: SessionGateway;
  messagesGateway: MessageGateway;
  configurationsGateway: ChatConfigurationsGateway;
  notifications: NotificationGateway;
  appearance?: ChatConfigurationsType;
  uuidAdapter: Uuid;
}>;

export const ChatComponent = ({
  configurations,
  ws,
  sessionGateway,
  messagesGateway,
  configurationsGateway,
  appearance,
  notifications,
  children,
  uuidAdapter,
}: IChatComponentProps) => {
  const [sessionState, setSessionState] = useState<Session | null>(null);
  const [messageState, setMessageState] = useState<MessageList>(
    new MessageList([])
  );

  const wsRef = useRef<SocketConnection | null>(null);

  const onIncomingMessage = (data: Message, from: From) => {
    const newMessageList = new MessageList(messageState?.messages);
    newMessageList.observers = messageState?.observers || [];
    newMessageList.addMessage({
      ...data,
      id: data.id || uuidAdapter.generate(),
      from,
    });

    setMessageState(newMessageList);

    const hasToNotify = from === From.BOT;
    if (hasToNotify)
      notifications.postLocal('Nova mensagem', data.message as string);
  };

  sessionGateway.onEndConversation(async () => {
    setTimeout(async () => {
      await sessionGateway.clearSession();
    }, 500);
  });
  messagesGateway.onMessage((msg: Message) => onIncomingMessage(msg, From.BOT));

  useEffect(() => {
    if (!wsRef.current || !wsRef.current.isConnected()) {
      wsRef.current = ws;
      wsRef.current.connect();
      wsRef.current.onOpen(async () => {
        await sessionGateway.linkSession();
      });
    }

    return () => {
      wsRef.current?.disconnect();
    };
  }, [ws]);

  const onLink = useCallback(async () => {
    const currentSession = await sessionGateway.getCurrent();
    await sessionGateway.subscribe(currentSession.current);
  }, [sessionGateway]);

  useEffect(() => {
    async function loadData() {
      const [storedSession, storedMessages] = await Promise.all([
        sessionGateway.getCurrent(),
        messagesGateway.getMessages(),
      ]);

      storedSession.register(
        new Observer('sendAction', async (data: SocketPayload) => {
          await sessionGateway.sendAction(data);
        })
      );

      storedSession.register(
        new Observer('clearSession', async () => {
          await sessionGateway.clearSession();
        })
      );

      wsRef?.current?.onLink(onLink);

      setSessionState(storedSession);

      storedMessages.register(
        new Observer('addMessage', async (data: any) => {
          if (data.type !== MessageTypes.TYPING) {
            if (data.from === From.USER) {
              await messagesGateway.sendMessage(data);
            } else {
              await messagesGateway.storeMessage(data);
              await messagesGateway.sendStatus(data.id, 'delivered');
            }
          }
        })
      );

      setMessageState(storedMessages);
    }

    loadData();
  }, [sessionGateway, messagesGateway]);

  const restartConversation = () => {
    wsRef.current?.disconnect();
    const messageList = new MessageList([]);
    messageList.observers = messageState?.observers || [];
    setMessageState(messageList);
    messageState?.clearMessages();
    sessionState?.clearSession();
  };

  const debouncedRestartConversation = useDebounce(restartConversation, 500);

  const [configurationsState, setConfigurationsState] =
    useState<ChatConfigurations>(configurations);

  useEffect(() => {
    const loadConfigurations = async () => {
      const configurationsResponse = await configurationsGateway.getStyles(
        Global.botId,
        appearance
      );
      setConfigurationsState(
        new ChatConfigurations(
          configurationsResponse.title,
          configurationsResponse.poweredBy,
          configurationsResponse.poweredByUrl,
          configurationsResponse.settings,
          configurationsState.isOpen
        )
      );
    };

    loadConfigurations();
  }, [configurationsGateway, Global.botId]);

  const toggleIsChatOpen = () => {
    const updatedConfigurations = new ChatConfigurations(
      configurationsState.title,
      configurationsState.poweredBy,
      configurationsState.poweredByUrl,
      configurationsState.settings,
      configurationsState.isOpen
    );
    updatedConfigurations.toggleIsOpen();
    setConfigurationsState(updatedConfigurations);
  };

  const closeChat = () => {
    const updatedConfigurations = new ChatConfigurations(
      configurationsState.title,
      configurationsState.poweredBy,
      configurationsState.poweredByUrl,
      configurationsState.settings,
      configurationsState.isOpen
    );
    updatedConfigurations.close();
    setConfigurationsState(updatedConfigurations);
  };

  const sendNotification = (
    title: string,
    message: string,
    filePath?: string
  ) => {
    notifications.postLocal(title, message, filePath);
  };

  const sendUserMessage = (msg: Message) => {
    if (wsRef.current?.isConnected()) {
      onIncomingMessage(msg, From.USER);
    } else {
      wsRef.current?.connect();
      wsRef.current?.onOpen(async () => {
        await sessionGateway.linkSession();
      });
      wsRef.current?.onLink(async () => {
        sendUserMessage(msg);
      });
    }
  };

  return (
    <>
      <Chat
        messages={messageState?.messages || []}
        configurations={configurationsState}
        close={closeChat}
        restartConversation={debouncedRestartConversation}
        sendMessage={sendUserMessage}
        sendNotification={sendNotification}
      />
      {children ? (
        React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement, {
          onPress: toggleIsChatOpen,
        })
      ) : (
        <Widget
          onPress={toggleIsChatOpen}
          imageUrl={configurationsState?.settings?.botFab}
        />
      )}
    </>
  );
};
