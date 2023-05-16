import type { PropsWithChildren } from 'react';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  ChatConfigurations,
  ChatConfigurationsType,
} from '../entities/ChatConfigurations';
import { initialConfigs } from '../constants';

export type ChatConfigurationsContextType = {
  chatConfigurations: ChatConfigurations;
  updateState: () => void;
};

const ChatConfigurationsContext = createContext<ChatConfigurationsContextType>({
  chatConfigurations: {} as ChatConfigurations,
  updateState: () => {},
});

export const useChatConfigurations = (): ChatConfigurationsContextType =>
  useContext(ChatConfigurationsContext);

type ChatConfigurationsProviderProps = PropsWithChildren<{
  initialChatConfigurations: ChatConfigurationsType;
}>;

export default function ChatConfigurationsProvider({
  initialChatConfigurations,
  children,
}: ChatConfigurationsProviderProps) {
  const isFirstRender = useRef(true);

  const [chatConfigurations, setChatConfigurations] = useState(
    new ChatConfigurations(
      initialChatConfigurations?.title || '',
      initialChatConfigurations?.poweredBy || '',
      initialChatConfigurations?.poweredByUrl || '',
      initialChatConfigurations?.settings || '',
      initialChatConfigurations?.isOpen || false
    )
  );

  const updateState = () => {
    setChatConfigurations(
      (prevState) =>
        new ChatConfigurations(
          prevState?.title || initialConfigs.title,
          prevState?.poweredBy || initialConfigs.poweredBy,
          prevState?.poweredByUrl || initialConfigs.poweredByUrl,
          prevState?.settings || initialConfigs.settings,
          prevState?.isOpen || initialConfigs.isOpen
        )
    );
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setChatConfigurations(
      new ChatConfigurations(
        initialChatConfigurations?.title || initialConfigs.title,
        initialChatConfigurations?.poweredBy || initialConfigs.poweredBy,
        initialChatConfigurations?.poweredByUrl || initialConfigs.poweredByUrl,
        initialChatConfigurations?.settings || initialConfigs.settings,
        initialChatConfigurations?.isOpen || initialConfigs.isOpen
      )
    );
  }, [initialChatConfigurations]);

  return (
    <ChatConfigurationsContext.Provider
      value={{ chatConfigurations, updateState }}
    >
      {children}
    </ChatConfigurationsContext.Provider>
  );
}
