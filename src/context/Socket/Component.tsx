import React, {
  useContext,
  useEffect,
  useCallback,
  useRef,
  useState,
} from 'react';
import { Linking } from 'react-native';
import socketio, { Socket } from 'socket.io-client';

import { SocketContextProvider, SocketContext } from './Context';

import { StorageState } from '../../types/AsyncStorage';
import {
  Message,
  From,
  MessageTypes,
  CarouselDestinationTypes,
} from '../../types/Message';
import {
  ISocketContextState,
  IHandleCarouselButtonClickProps,
} from '../../types/Socket';

import { useAsyncStorage } from '../AsyncStorage';
import { useChatConfigurations } from '../ChatConfigurations';

import { getHourAndMinutes } from '../../utils/getHourAndMinutes';
import { sendNotification } from '../../utils/sendLocalNotification';

import { SOCKET_URL } from '../../constants';
import api from '../../services/api';
import { useDebounce } from '../../hooks/useDebounce';

const botChannel = 'webchat';
const TWO_SECONDS = 2000;

interface Props {
  children?: React.ReactNode;
  params?: Object;
  botId: string;
}

function SocketContextComponent({ children, botId, params }: Props) {
  const clientRef = useRef<Socket | null>(null);
  const isFirstRender = useRef(true);
  const [waitingToReconnect, setWaitingToReconnect] = useState(false);

  const { getItemsAsync, clearAsync, saveDataAsync } = useAsyncStorage();
  const { fetchBotAndUpdateConfigs } = useChatConfigurations();

  const [storageState, setStorageState] = useState<null | StorageState>(null);

  const debouncedMessages = useDebounce(storageState?.messages, TWO_SECONDS);

  const addMessage = (newMessage: Message) => {
    setStorageState((prevState) => {
      const newMessages = [
        ...(prevState?.messages?.filter?.(
          (m) => m.type !== MessageTypes.TYPING
        ) ?? []),
        {
          ...newMessage,
          hour: getHourAndMinutes(),
        } as Message,
      ];

      return {
        messages: newMessages,
        sessionId: prevState?.sessionId,
      } as StorageState;
    });
  };

  const handleSubmitMessage = useCallback(
    async ({ message, type, ext, localFileUri, document }: Message) => {
      const isMedia = type !== MessageTypes.TEXT;

      try {
        addMessage({
          from: From.USER,
          message: isMedia ? localFileUri : message,
          type,
          document,
        } as Message);

        clientRef.current?.emit('message', {
          botId,
          message,
          isMedia,
          ext,
          isPreview: false,
          id: storageState?.sessionId,
          botChannel,
        });
      } catch (error) {
        console.log('Error sending message', error);
      }
    },
    [storageState?.sessionId]
  );

  const startConversation = (client: Socket) => {
    client.emit('subscribe', {
      botId,
      isPreview: false,
      botChannel,
    });
  };

  const restartConversation = useCallback(() => {
    console.log('RESTARTING');
    clearAsync().then(() => {
      console.log('CLEANED');
      console.log('client', clientRef.current);
      if (clientRef.current) {
        console.log('STARTING');
        startConversation(clientRef.current);
      }
    });
  }, [clientRef.current]);

  useEffect(() => {
    (async () => {
      if (debouncedMessages?.length && storageState?.sessionId) {
        await saveDataAsync(storageState as StorageState);
      }
    })();
  }, [debouncedMessages]);

  useEffect(() => {
    getItemsAsync()
      .then((stored) => {
        setStorageState(stored);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    (async () => {
      await fetchBotAndUpdateConfigs(botId);
    })();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (waitingToReconnect) return;

    const client = socketio(SOCKET_URL);

    if (!clientRef?.current) {
      clientRef.current = client;

      client.on('connect', () => {
        startConversation(client);
      });

      client.on('subscribe-response', async (data) => {
        if (!storageState?.sessionId || storageState.sessionId !== data.id) {
          const newData: StorageState = {
            sessionId: data.id,
            messages: storageState?.messages || [],
          };

          setStorageState(newData);
          await saveDataAsync(newData);
        }

        client.emit('start', {
          botId,
          id: data.id,
          isPreview: false,
          botChannel,
          parameters: JSON.stringify(params),
        });
      });

      client.on('reconnect_attempt', () => {
        client.io.opts.transports = ['polling', 'websocket'];
      });

      client.on('disconnect', () => {
        if (!clientRef.current) return;
        if (waitingToReconnect) return;

        setWaitingToReconnect(true);

        setTimeout(() => setWaitingToReconnect(false), 500);
      });

      client.on('message', (data) => {
        const incomingMessage: Message = {
          ...data,
          from: From.BOT,
        };

        addMessage(incomingMessage);

        if (incomingMessage.type !== MessageTypes.TYPING) {
          sendNotification({ body: incomingMessage.message as string });
        }
      });
    }
  }, []);

  const handleOpenLink = async (url: string) => {
    await Linking.openURL(url);
  };

  const handleCarouselButtonClick = async ({
    clickedButton,
    clickedCard,
  }: IHandleCarouselButtonClickProps) => {
    const { destination } = clickedButton;

    if (destination?.type === CarouselDestinationTypes.URL) {
      handleOpenLink(destination?.value as string);
    }

    if (destination?.type === CarouselDestinationTypes.PHONE) {
      const treated = destination?.value?.replace(/[^A-Z0-9]/gi, '');
      handleOpenLink(`tel:+55${treated}`);
    }

    await api.post('/webchat/action', {
      botId: botId,
      action: {
        type: MessageTypes.CAROUSEL,
        data: { clickedButton, clickedCard },
      },
      sessionId: storageState?.sessionId,
    });
  };

  return (
    <SocketContextProvider
      value={{
        handleCarouselButtonClick,
        handleSubmitMessage,
        messages: storageState?.messages || [],
        restartConversation,
      }}
    >
      {children}
    </SocketContextProvider>
  );
}

export default SocketContextComponent;

export function useSocketContext() {
  return useContext(SocketContext) as ISocketContextState;
}
