import type { PropsWithChildren } from 'react';

import React, { useState, useEffect } from 'react';

import ChatConfigurationsContextProvider from '../context/ChatConfigurationsContext';
import { ChatConfigurationsGateway } from '../gateways/ChatConfigurationsGateway';
import { Global } from '../global';
import { initialConfigs } from '../constants/initialChatConfigurations';
import { ChatConfigurationsType } from '../types/chatConfigurations';

type ChatConfigurationsProviderProps = PropsWithChildren<{
  configurations: ChatConfigurationsGateway;
  appearance?: ChatConfigurationsType;
}>;

export const ChatConfigurationsProvider = ({
  configurations,
  appearance,
  children,
}: ChatConfigurationsProviderProps) => {
  const { botId } = Global;

  const [initialConfigurations, setInitialConfigurations] =
    useState<ChatConfigurationsType>(initialConfigs);

  useEffect(() => {
    const getInitialStyles = async () => {
      const chatConfigs = await configurations.getStyles(botId);
      setInitialConfigurations({
        ...chatConfigs,
        settings: {
          ...chatConfigs.settings,
          botFab: appearance?.settings?.botFab || chatConfigs.settings.botFab,
          mainColor:
            appearance?.settings.mainColor || chatConfigs.settings.mainColor,
          secondaryColor:
            appearance?.settings?.secondaryColor ||
            chatConfigs.settings.secondaryColor,
          mainTextColor:
            appearance?.settings?.mainTextColor ||
            chatConfigs.settings.mainTextColor,
          secondaryTextColor:
            appearance?.settings?.secondaryTextColor ||
            chatConfigs.settings.secondaryTextColor,
        },
      });
    };

    getInitialStyles();
  }, [botId]);

  return (
    <ChatConfigurationsContextProvider
      initialChatConfigurations={initialConfigurations}
    >
      {children}
    </ChatConfigurationsContextProvider>
  );
};
