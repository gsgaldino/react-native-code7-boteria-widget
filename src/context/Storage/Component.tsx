import React, { useContext, useState, useEffect } from 'react';
import { StorageContext, StorageContextProvider } from './Context';
import { Message, IAppState, MessageTypes } from '../../types';

import { useEncryptedStorage } from '../../hooks/useEncryptedStorage';
import { useDebounce } from '../../hooks/useDebounce';
import { getHourAndMinutes } from '../../utils';

const TWO_SECONDS = 2000;

const StorageContextComponent: React.FC = ({ children }) => {
  const { retrieve, store } = useEncryptedStorage();

  const [messages, setMessages] = useState<Message[]>([]);
  const debouncedMessages = useDebounce(messages, TWO_SECONDS);

  useEffect(() => {
    const getStoredData = async () => {
      const storedMessages = await retrieve('messages');

      if (storedMessages) setMessages(JSON.parse(storedMessages) as Message[]);
    };

    getStoredData();
  }, []);

  useEffect(() => {
    const storeMessages = async () => {
      if (debouncedMessages.length) {
        store('messages', debouncedMessages);
      }
    };

    storeMessages();
  }, [debouncedMessages]);

  const addMessage = (newMessage: Message) => {
    setMessages((prevState) => {
      const newMessages = [
        ...(prevState?.filter?.((m) => m.type !== MessageTypes.TYPING) ?? []),
        {
          ...newMessage,
          hour: getHourAndMinutes(),
        } as Message,
      ];

      return newMessages;
    });
  };

  const resetMessages = () => setMessages([]);

  return (
    <StorageContextProvider value={{ messages, addMessage, resetMessages }}>
      {children}
    </StorageContextProvider>
  );
};

export default StorageContextComponent;
export const useStorage = () => useContext(StorageContext) as IAppState;
