import React, { useState, useRef, useEffect } from 'react';

import { Widget } from './components/Widget';
import { Chat } from './components/Chat';

import { ChatConfigurations, Session, MessageList, Observer } from './entities';
import type { ChatConfigurationsType } from './entities/ChatConfigurations';
import type { WebSocketAdapter } from './infra';
import type { SessionGateway } from './gateways/SessionGateway';
import type { MessageGateway } from './gateways/MessageGateway';
import type { ChatConfigurationsGateway } from './gateways/ChatConfigurationsGateway';
import type { Message, SocketPayload } from './types';
import { From, MessageTypes } from './types';
import { Global } from './global';

interface IChatComponentProps {
  configurations: ChatConfigurations;
  ws: WebSocketAdapter;
  sessionGateway: SessionGateway;
  messagesGateway: MessageGateway;
  configurationsGateway: ChatConfigurationsGateway;
  appearance?: ChatConfigurationsType;
}

export const ChatComponent = ({
  configurations,
  ws,
  sessionGateway,
  messagesGateway,
  configurationsGateway,
  appearance,
}: IChatComponentProps) => {
  const [sessionState, setSessionState] = useState<Session | null>(null);

  const [messageState, setMessageState] = useState<MessageList>(
    new MessageList([])
  );

  const wsRef = useRef<WebSocketAdapter | null>(null);

  const onIncomingMessage = (data: any, from: From) => {
    const newMessageList = new MessageList(messageState?.messages);
    newMessageList.observers = messageState?.observers || [];
    newMessageList.addMessage({
      ...data,
      id: data.id || `${Date.now() * Math.random()}`,
      from,
    });

    setMessageState(newMessageList);
  };

  sessionGateway.onEndConversation(async () => {
    await sessionGateway.clearSession();
  });
  messagesGateway.onMessage((msg: any) => onIncomingMessage(msg, From.BOT));

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = ws;
      wsRef.current.connect();
      wsRef.current.onOpen(async () => {
        await sessionGateway.linkSession();
      });
    }
  }, [ws, sessionGateway]);

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
          const newSession = await sessionGateway.subscribe('');
          newSession.observers = storedSession.observers;
          setSessionState(newSession);
        })
      );

      await sessionGateway.subscribe(storedSession.current);
      setSessionState(storedSession);

      storedMessages.register(
        new Observer('addMessage', async (data: any) => {
          if (data.type !== MessageTypes.TYPING) {
            if (data.from === From.USER) {
              await messagesGateway.sendMessage(data);
            } else {
              await messagesGateway.sendStatus(data.id, 'delivered');
              await messagesGateway.storeMessage(data);
            }
          }
        })
      );

      setMessageState(storedMessages);
    }

    loadData();
  }, [sessionGateway, messagesGateway]);

  const restartConversation = () => {
    const messageList = new MessageList([]);
    messageList.observers = messageState?.observers || [];
    setMessageState(messageList);
    messageState?.clearMessages();
    sessionState?.clearSession();
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <>
      <Chat
        messages={messageState?.messages || []}
        configurations={configurationsState}
        close={closeChat}
        restartConversation={restartConversation}
        sendMessage={(msg: Message) => onIncomingMessage(msg, From.USER)}
      />
      <Widget
        onPress={toggleIsChatOpen}
        imageUrl={configurationsState?.settings?.botFab}
      />
    </>
  );
};
