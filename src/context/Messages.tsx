import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import socketio from 'socket.io-client';

const SOCKET_URL =
  'https://f6dc-2804-431-cff7-9f9f-a0de-42e2-3c5e-f6b8.ngrok.io';
const botId = '62ec1ac218ba8f42452383a6';
const client = socketio(SOCKET_URL);

interface Message {
  from: string;
  message: string;
  type: string;
  ext?: string;
}

interface IMessageContextProviderProps {
  children: Element;
}

interface IAppCtx {
  messages: Message[] | undefined;
  addMessage: Function;
  handleSubmitMessage: Function;
}

const MessagesContext = createContext<IAppCtx | null | any>(null);

export default function MessagesContextProvider({
  children,
}: IMessageContextProviderProps) {
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [sessionId, setSessionId] = useState(null);

  const addMessage = useCallback((message: Message) => {
    setMessages((prevState) => [
      ...(prevState.filter((m) => m.type !== 'TYPING') ?? []),
      message as Message,
    ]);
  }, []);

  const handleSubmitMessage = useCallback(
    ({ message, type, ext }: Message) => {
      const isMedia = type !== 'TEXT';
      client.emit('message', {
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
        { from: 'user', message, type },
      ]);
    },
    [sessionId]
  );

  const startNewSession = (c: any) => {
    c.emit('subscribe', {
      botId,
      isPreview: true,
    });
  };

  useEffect(() => {
    const handleStartConversation = (session: string) => {
      client.emit('start', {
        botId: botId,
        id: session,
        channel: 'webchat',
        contactNumber: '11988887777',
      });
    };

    client.on('connect', () => {
      startNewSession(client);
    });

    client.on('message', (data) => {
      addMessage({ ...data, from: 'bot' });
    });

    // start new session
    client.emit('subscribe', { botId });

    // response with bot and session data
    client.on('subscribe-response', (data) => {
      handleStartConversation(data?.id);
      setSessionId(data?.id);
    });

    client.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sampleContext: IAppCtx = {
    messages,
    addMessage,
    handleSubmitMessage,
  };

  return (
    <MessagesContext.Provider value={sampleContext}>
      {children}
    </MessagesContext.Provider>
  );
}

export const useMessages = () => {
  const context = useContext(MessagesContext);
  return context;
};
