import type { PropsWithChildren } from 'react';
import React, { useState, useEffect } from 'react';
import { From, MessageTypes } from '../types';

import { useUuid } from '../context/UuidContext';
import MessageListContextProvider from '../context/MessageListContext';
import { MessageGateway } from '../gateways/MessageGateway';
import { NotificationGateway } from '../gateways/NotificationGateway';
import { MessageList } from '../entities/MessageList';
import { Observer } from '../entities/Observer';

type MessageListProviderProps = PropsWithChildren<{
  messageGateway: MessageGateway;
  notificationGateway: NotificationGateway;
}>;

export const MessageListProvider = ({
  messageGateway,
  notificationGateway,
  children,
}: MessageListProviderProps) => {
  const { uuid } = useUuid();
  const [initialMessages, setInitialMessages] = useState<MessageList>(
    new MessageList([])
  );

  useEffect(() => {
    const fetchInitialMessages = async () => {
      const messages = await messageGateway.getMessages();
      messageGateway.onMessage((data: any) => {
        messages.addMessage({
          ...data,
          id: data.id || uuid.generate(),
          from: From.BOT,
        });

        if (data.type !== MessageTypes.TYPING) {
          notificationGateway.postLocal(data.message);
        }
      });

      messages.register(
        new Observer('clearMessages', async () => {
          setInitialMessages(await messageGateway.clearMessages());
        })
      );

      messages.register(
        new Observer('addMessage', async (data: any) => {
          if (data.type !== MessageTypes.TYPING) {
            if (data.from === From.USER) {
              setInitialMessages(await messageGateway.sendMessage(data));
            } else {
              await messageGateway.sendStatus(data.id, 'delivered');
              setInitialMessages(await messageGateway.storeMessage(data));
            }
          }
        })
      );

      setInitialMessages(messages);
    };

    fetchInitialMessages();
  }, []);

  return (
    <MessageListContextProvider initialMessageList={initialMessages}>
      {children}
    </MessageListContextProvider>
  );
};
