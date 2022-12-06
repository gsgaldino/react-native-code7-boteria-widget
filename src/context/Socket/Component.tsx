import React, {
  useContext,
  memo,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Linking } from 'react-native';
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
  const socketUrl = 'https://b1d3-191-193-237-58.ngrok.io';

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
        id: sessionId,
        botChannel: 'WebChat',
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
        botChannel: 'WebChat',
        contactNumber: phone,
      });
    },
    [clientRef]
  );

  const startNewSession = (client: Socket) => {
    client.emit('subscribe', {
      botId: botId,
      botChannel: 'WebChat',
    });
  };

  const handleOpenLink = useCallback(async (url: string) => {
    await Linking.openURL(url);
  }, []);

  const handleCarouselButtonClick = (clickInfo: any) => {
    const { clickedButton, clickedCard } = clickInfo;
    const { destination } = clickedButton;
    const { type, value } = destination;

    if (type === 'url') {
      handleOpenLink(value);
    }

    if (type === 'phone') {
      const treated = value.replace(/[^A-Z0-9]/gi, '');
      handleOpenLink(`tel:+55${treated}`);
    }

    clientRef?.current?.emit('action', {
      botId: botId,
      action: {
        type: MessageTypes.CAROUSEL,
        data: { clickedButton, clickedCard },
      },
      id: sessionId,
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

        const [webchatChannel] = data?.bot?.channels?.filter((ch: IChannel) => {
          return ch.channelId === 'WebChat';
        });

        const botConfigs: IBotConfigs = {
          title: data?.bot?.title,
          botFab: webchatChannel?.settings?.botFab,
          colors: {
            main: webchatChannel?.settings?.mainColor,
            secondary: webchatChannel?.settings?.secondaryColor,
            mainText: webchatChannel?.settings?.mainTextColor,
            secondaryText: webchatChannel?.settings?.secondaryTextColor,
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

    return () => {
      clientRef.current = null;
    };
  }, [botId, handleStartConversation]);

  const state: ISocketContextState = useMemo(
    () => ({
      handleSubmitMessage,
      messages,
      handleCarouselButtonClick,
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
