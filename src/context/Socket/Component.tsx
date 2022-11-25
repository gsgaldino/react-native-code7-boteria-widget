import React, {
  useContext,
  memo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { SocketContextProvider, SocketContext } from './Context';
import { ISocketContextState } from 'types/Socket';
import { useSocket } from '../../hooks/useSocket';
import { From, Message } from '../../types/Message';
const botId = '62ec1abb18ba8f42452383a4';

const SocketComponent: React.FC<React.ReactNode> = (props) => {
  const { children } = props;
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<null | string>(null);

  const socketUrl =
    'https://54ee-2804-431-cff6-2184-256f-da1d-b06-efee.ngrok.io';
  const socket = useSocket(socketUrl);

  const addMessage = useCallback((message: Message) => {
    setMessages((prevState) => [
      ...(prevState.filter((m) => m.type !== 'TYPING') ?? []),
      message as Message,
    ]);
  }, []);

  const handleSubmitMessage = useCallback(
    ({ message, type, ext }: Message) => {
      const isMedia = type !== 'TEXT';
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
    });

    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  };

  useEffect(() => {
    startListeners();
    // start new session
    socket.emit('subscribe', { botId });
  }, []);

  const state: ISocketContextState = {
    socket,
    emitMessage: () => {},
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
