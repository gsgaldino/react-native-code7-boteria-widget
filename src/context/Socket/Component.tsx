import React, {
  useContext,
  memo,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { SocketContextProvider, SocketContext } from './Context';
import { Socket, io } from 'socket.io-client';
import { useChatConfigurations } from '../ChatConfigurations';

import { ISocketContextState } from 'types/Socket';
import { From, Message, MessageTypes } from '../../types/Message';
import { IBotConfigs } from '../../types/ChatConfigurations';

interface IChannel {
  channelId: string;
}

interface ISocketComponentProps {
  children: React.ReactChild;
  botId: string;
}

const SocketComponent: React.FC<ISocketComponentProps> = (props) => {
  const phone = '11988889999';
  const channel = 'webchat';
  const socketUrl =
    'https://7174-2804-431-cff6-9aaa-75a4-d241-3021-7f2a.ngrok.io';

  const { children, botId } = props;
  const { setBotConfigs } = useChatConfigurations();

  const clientRef = useRef<null | Socket>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<null | string>(null);

  const addMessage = useCallback((message: Message) => {
    setMessages((prevState) => [
      ...(prevState.filter((m) => m.type !== MessageTypes.TYPING) ?? []),
      message as Message,
    ]);
  }, []);

  const handleSubmitMessage = useCallback(
    ({ message, type, ext }: Message) => {
      const isMedia = type !== MessageTypes.TEXT;
      clientRef?.current?.emit('message', {
        botId: botId,
        message,
        isMedia,
        ext,
        isPreview: true,
        id: sessionId,
        botChannel: 'webchat',
      });

      setMessages((prevState) => [
        ...prevState,
        { from: From.USER, message, type },
      ]);
    },
    [sessionId]
  );

  const handleStartConversation = useCallback(
    (_sessionId: string) => {
      setSessionId(_sessionId);
      clientRef?.current?.emit('start', {
        botId: botId,
        id: _sessionId,
        channel: channel,
        contactNumber: phone,
      });
    },
    [clientRef]
  );

  const startNewSession = (client: Socket) => {
    client.emit('subscribe', {
      botId: botId,
      isPreview: true,
    });
  };

  useEffect(() => {
    if (!clientRef.current) {
      const client = io(socketUrl);
      clientRef.current = client;

      client.on('connect', () => {
        if (!sessionId) {
          startNewSession(client);
        }
      });

      client.on('message', (data) => {
        addMessage({ ...data, from: From.BOT });
      });

      client.on('subscribe-response', (data) => {
        setSessionId(data?.id);
        handleStartConversation(data.id);

        const [channel] = data?.bot?.channels?.filter((ch: IChannel) => {
          return ch.channelId === 'WebChat';
        });

        const botConfigs: IBotConfigs = {
          title: data?.bot?.title,
          botFab: channel?.settings?.botFab,
          colors: {
            main: channel?.settings?.mainColor,
            secondary: channel?.settings?.secondaryColor,
            mainText: channel?.settings?.mainTextColor,
            secondaryText: channel?.settings?.secondaryTextColor,
          },
        };

        setBotConfigs(botConfigs);
      });

      client.on('reconnect_attempt', () => {
        client.io.opts.transports = ['polling', 'websocket'];
      });

      client.on('disconnect', () => {
        if (clientRef.current) {
          console.log('ws closed by server');
        } else {
          console.log('ws closed by app component unmount');
          return;
        }
      });

      client.on('end_conversation', (data) => {
        if (!data?.isTransfer) {
          setSessionId('');
        }
      });

      return () => {
        clientRef.current = null;
        client.close();
      };
    }
  }, [botId, handleStartConversation]);

  const state: ISocketContextState = useMemo(
    () => ({
      handleSubmitMessage,
      messages,
    }),
    [messages]
  );

  return (
    <SocketContextProvider value={state}>{children}</SocketContextProvider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext) as ISocketContextState;
};

export default memo(SocketComponent);
