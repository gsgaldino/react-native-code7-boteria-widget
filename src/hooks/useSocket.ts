import { useRef, useEffect, useState } from 'react';
import {
  ChatbotWebSocket,
  OnOpenCallback,
  OnMessageCallback,
} from '../providers';
import { From } from '../types';

import { useStorage } from '../context/Storage/Component';
import { useSocketActions } from './useSocketActions';

import { sendNotification } from '../utils';

export const useSocket = (wsUrl: string) => {
  const isFirstRender = useRef(true);
  const wsRef = useRef<ChatbotWebSocket | null>(null);

  const [waitingToReconnect, setWaitingToReconnect] = useState(false);

  const { subscribe } = useSocketActions();

  const { addMessage } = useStorage();

  const onOpenCallback: OnOpenCallback = async () => {
    await subscribe();
  };

  const onMessageCallback: OnMessageCallback = (msg) => {
    sendNotification(msg);
    addMessage({
      ...msg,
      from: From.BOT,
    });
  };

  const disconnect = () => {
    wsRef.current?.disconnect();
    setWaitingToReconnect(true);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!wsRef.current) {
      wsRef.current = new ChatbotWebSocket(wsUrl);

      wsRef.current.onMessage(onMessageCallback);
      wsRef.current.onOpen(onOpenCallback);

      wsRef.current.connect();
    }

    return () => {
      wsRef.current?.disconnect();
    };
  }, [isFirstRender.current, waitingToReconnect]);

  return { disconnect };
};
