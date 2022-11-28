import React, {
  useContext,
  memo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { SocketContextProvider, SocketContext } from './Context';
import { useSocket } from '../../hooks/useSocket';
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
  const { children, botId } = props;
  const { setBotConfigs } = useChatConfigurations();

  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<null | string>(null);

  const socketUrl = 'https://8827-177-188-34-207.ngrok.io';
  const socket = useSocket(socketUrl);

  const addMessage = useCallback((message: Message) => {
    setMessages((prevState) => [
      ...(prevState.filter((m) => m.type !== MessageTypes.TYPING) ?? []),
      message as Message,
    ]);
  }, []);

  const handleSubmitMessage = useCallback(
    ({ message, type, ext }: Message) => {
      const isMedia = type !== MessageTypes.TEXT;
      socket.emit('message', {
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

  const startNewSession = () => {
    socket.emit('subscribe', {
      botId,
      isPreview: true,
    });
  };

  const handleStartConversation = (session: string) => {
    socket.emit('start', {
      botId: botId,
      id: session,
      channel: 'webchat',
      contactNumber: '11988887777',
    });
  };

  const startListeners = () => {
    socket.on('connect', () => {
      startNewSession();
    });

    socket.on('message', (data) => {
      addMessage({ ...data, from: From.BOT });
    });

    // response with bot and session data
    socket.on('subscribe-response', (data) => {
      handleStartConversation(data?.id);
      setSessionId(data?.id);

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

    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  };

  useEffect(() => {
    startListeners();
    socket.emit('subscribe', { botId });
  }, []);

  const state: ISocketContextState = {
    socket,
    handleSubmitMessage,
    messages,
  };

  return (
    <SocketContextProvider value={state}>{children}</SocketContextProvider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext) as ISocketContextState;
};

export default memo(SocketComponent);
