import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
  useContext,
  memo,
} from 'react';
import { io, Socket } from 'socket.io-client';

import { SocketContextProvider, SocketContext } from './Context';
import { useChatConfigurations } from '../../context/ChatConfigurations';

import {
  IHandleCarouselButtonClickProps,
  ISocketContextState,
} from '../../types/Socket';
import {
  CarouselDestinationTypes,
  From,
  Message,
  MessageTypes,
} from '../../types/Message';
import { IBotConfigs } from '../../types/ChatConfigurations';
import { getHourAndMinutes } from '../../utils/getHourAndMinutes';
import { Linking } from 'react-native';
import { useDebounce } from '../../hooks/useDebounce';
import {
  updateAsync,
  getItemsAsync,
  updateSessionIdAsync,
  clearAsync,
} from '../../utils/asyncStorage';

interface ISocketContextComponentProps {
  botId: string;
  params?: string;
  children: React.ReactNode;
}

interface IChannel {
  channelId: string;
  settings: {
    botFab: string;
    mainTextColor: string;
    mainColor: string;
    secondaryColor: string;
    secondaryTextColor: string;
  };
}

const TWO_SECONDS = 2000;
const socketUrl = 'https://737a-177-198-85-112.ngrok.io';
const botChannel = 'WebChat';
const channel = 'webchat';

function SocketContextComponent(props: ISocketContextComponentProps) {
  let sessionId: string | null = null;

  const { setBotConfigs } = useChatConfigurations();
  const clientRef = useRef<null | Socket>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const debouncedMessages = useDebounce(messages, TWO_SECONDS);

  useEffect(() => {
    async function getStoredData() {
      const storedData = await getItemsAsync();
      const json = JSON.parse(storedData ?? '[]');

      setMessages(json.messages as Message[]);
    }

    getStoredData();
  }, []);

  useEffect(() => {
    async function updateStorage() {
      const storedData = await getItemsAsync();
      const json = JSON.parse(storedData ?? '[]');

      await updateAsync({ messages, sessionId: sessionId || json.sessionId });
    }

    updateStorage();
  }, [debouncedMessages]);

  interface IUpdateChannelWithBotConfigsProps {
    channels: IChannel[];
    botTitle: string;
  }

  const updateChannelWithBotConfigs = ({
    channels,
    botTitle,
  }: IUpdateChannelWithBotConfigsProps) => {
    const [webchatChannel] = channels?.filter((ch) => {
      return ch.channelId === botChannel;
    });

    const botConfigs: IBotConfigs = {
      title: botTitle,
      botFab: String(webchatChannel?.settings?.botFab),
      colors: {
        main: String(webchatChannel?.settings?.mainColor),
        secondary: String(webchatChannel?.settings?.secondaryColor),
        mainText: String(webchatChannel?.settings?.mainTextColor),
        secondaryText: String(webchatChannel?.settings?.secondaryTextColor),
      },
    };

    setBotConfigs(botConfigs);
  };

  const startSession = () => {
    clientRef.current?.emit('subscribe', {
      id: sessionId,
      botId: props.botId,
      botChannel,
    });
  };

  const handleStartConversation = useCallback(
    async (_sessionId: string) => {
      clientRef?.current?.emit('start', {
        botId: props.botId,
        id: _sessionId,
        channel: channel,
        botChannel: 'WebChat',
        contactNumber: sessionId,
      });
    },
    [clientRef]
  );

  const addMessage = useCallback(async (message) => {
    setMessages((prevState) => {
      const newState = [
        ...(prevState.filter((m) => m.type !== MessageTypes.TYPING) ?? []),
        {
          ...message,
          hour: getHourAndMinutes(),
        } as Message,
      ];
      return newState;
    });
  }, []);

  const handleSubmitMessage = useCallback(
    async ({ message, type, ext }: Message) => {
      const isMedia = type !== MessageTypes.TEXT;
      clientRef?.current?.emit('message', {
        botId: props.botId,
        message,
        isMedia,
        ext,
        id: sessionId,
        botChannel,
      });

      setMessages((prevState) => [
        ...prevState,
        {
          from: From.USER,
          message,
          type,
          hour: getHourAndMinutes(),
        } as Message,
      ]);
    },
    [sessionId]
  );

  const restartConversation = async () => {
    await clearAsync();
    setMessages([]);
    startSession();
  };

  useEffect(() => {
    if (!clientRef.current) {
      const client = io(socketUrl);
      clientRef.current = client;

      client.on('connect', async () => {
        const storedData = await getItemsAsync();
        const json = JSON.parse(storedData ?? '[]');

        sessionId = json?.sessionId as string;
        startSession();
      });

      client.on('message', async (data) => {
        const newMessage = { ...data, from: From.BOT };
        addMessage(newMessage);
      });

      client.on('subscribe-response', async (data) => {
        updateChannelWithBotConfigs({
          botTitle: data.bot.title as string,
          channels: data.bot.channels as IChannel[],
        });

        if (!sessionId || sessionId !== data.id) {
          sessionId = data.id;
          await updateSessionIdAsync(data.id);

          handleStartConversation(data.id);
        }
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
          sessionId = null;
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
  }, []);

  const handleOpenLink = useCallback(async (url: string) => {
    await Linking.openURL(url);
  }, []);

  const handleCarouselButtonClick = ({
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

    clientRef?.current?.emit('action', {
      botId: props.botId,
      action: {
        type: MessageTypes.CAROUSEL,
        data: { clickedButton, clickedCard },
      },
      id: sessionId,
    });
  };

  const state: ISocketContextState = useMemo(
    () => ({
      handleSubmitMessage,
      messages,
      handleCarouselButtonClick,
      restartConversation,
    }),
    [messages]
  );

  return (
    <SocketContextProvider value={state}>
      {props.children}
    </SocketContextProvider>
  );
}

export const useSocketContext = () => {
  return useContext(SocketContext) as ISocketContextState;
};

export default memo(SocketContextComponent);
