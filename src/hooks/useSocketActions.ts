import { useCallback } from 'react';
import { useStorage } from '../context/Storage/Component';
import { Message, MessageTypes, From, SocketPayload } from '../types';
import { channel } from '../constants';
import { useEncryptedStorage } from './useEncryptedStorage';

import { createService } from '../services';
import { Global } from '../global';
import { logger } from '../utils';

export const useSocketActions = () => {
  const { botId, env } = Global;

  const api = createService(env?.API_URL as string);
  const { store, retrieve } = useEncryptedStorage();
  const { addMessage } = useStorage();

  const subscribe = useCallback(async () => {
    const sessionId = await retrieve('sessionId');

    try {
      const { data } = await api.post('/webchat/subscribe', {
        sessionId,
        botId,
        parameters: JSON.stringify(Global.params),
      });

      const hasToStoreNewSessionId = !sessionId || sessionId !== data.sessionId;

      if (hasToStoreNewSessionId) await store('sessionId', data.sessionId);
    } catch (error) {
      logger.log(`Error on subscribe: ${JSON.stringify(error)}`);
    }
  }, [botId]);

  const handleSubmitMessage = useCallback(
    async ({ message, type, ext }: Message) => {
      const sessionId = await retrieve('sessionId');
      const isMedia = type !== MessageTypes.TEXT;

      try {
        addMessage({
          from: From.USER,
          message,
          type,
        } as Message);

        await api.post('/webchat/message', {
          botId,
          message,
          isMedia,
          ext,
          sessionId,
          botChannel: channel,
          isPreview: false,
        });
      } catch (error) {
        logger.log(`Error sending message ${JSON.stringify(error)}`);
      }
    },
    [botId]
  );

  const sendAction = useCallback(
    async (action: SocketPayload) => {
      try {
        const sessionId = await retrieve('sessionId');
        await api.post('/webchat/action', {
          botId,
          action,
          sessionId,
        });
      } catch (error) {
        logger.log(`Error when sending action: ${JSON.stringify(error)}`);
      }
    },
    [botId]
  );

  return { subscribe, handleSubmitMessage, sendAction };
};
