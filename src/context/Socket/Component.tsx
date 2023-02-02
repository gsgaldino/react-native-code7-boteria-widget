import React, {
  useContext,
  useEffect,
  useCallback,
  useRef,
  useState,
} from 'react';
import { Linking } from 'react-native';

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

const botChannel = 'WebChat';
const TWO_SECONDS = 2000;

interface Props {
  children?: React.ReactNode;
  params?: Object;
  botId: string;
}

function SocketContextComponent({ children, botId, params }: Props) {
  const clientRef = useRef<WebSocket | null>(null);
  const isFirstRender = useRef(true);

  const { getItemsAsync, clearAsync, saveDataAsync } = useAsyncStorage();
  const { fetchBotAndUpdateConfigs } = useChatConfigurations();

  const [storageState, setStorageState] = useState<null | StorageState>(null);

  const debouncedMessages = useDebounce(storageState?.messages, TWO_SECONDS);

  const subscribe = async () => {
    const { data } = await api.post('/webchat/subscribe', {
      sessionId: storageState?.sessionId,
      botId,
      channel: 'webchat',
      botChannel,
      parameters: JSON.stringify(params || '[]'),
    });

    return data;
  };

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

        await api.post('/webchat/message', {
          botId,
          message,
          isMedia,
          ext,
          sessionId: storageState?.sessionId,
          botChannel,
          isPreview: false,
        });
      } catch (error) {
        console.log('Error sending message', error);
      }
    },
    [storageState?.sessionId]
  );

  const onClientMessage = useCallback(
    (msg: WebSocketMessageEvent) => {
      console.log('INCOMING SERVER MESSAGE:', msg);
      try {
        const serverResponse = JSON.parse(msg.data);
        if (serverResponse.action === 'message') {
          const incomingMessage: Message = {
            ...serverResponse.data,
            from: From.BOT,
          };

          addMessage(incomingMessage);

          if (incomingMessage.type !== MessageTypes.TYPING) {
            sendNotification({ body: incomingMessage.message as string });
          }
        }
      } catch (error) {
        console.log('Error treating received message', error);
      }
    },
    [clientRef.current]
  );

  async function startConversation() {
    const subscribeResponse = await subscribe();

    if (
      !storageState?.sessionId ||
      subscribeResponse.sessionId !== storageState?.sessionId
    ) {
      const newData: StorageState = {
        sessionId: subscribeResponse.sessionId,
        messages: storageState?.messages || [],
      };

      setStorageState(newData);
      await saveDataAsync(newData);
    }

    return subscribeResponse;
  }

  const restartConversation = useCallback(() => {
    clearAsync().then(async () => {
      await startConversation();
    });
  }, []);

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
    const client = new WebSocket(SOCKET_URL);
    console.log('WEBSOCKET CLIENT:', client);
    if (!clientRef.current) {
      clientRef.current = client;

      client.onmessage = onClientMessage;
    }

    return () => {
      client.close();
      clientRef.current = null;
    };
  }, [SOCKET_URL]);

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

    startConversation();
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
