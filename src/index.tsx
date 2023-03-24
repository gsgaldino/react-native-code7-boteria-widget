import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import StorageContextProvider from './context/Storage/Component';
import SocketContextProvider from './context/Socket/Component';
import ChatConfigurationsContextProvider from './context/ChatConfigurations';

import App from './App';
import { Global } from './global';
import { getEnvironment } from './utils';
import { IAppProps } from './types';

export const Code7Boteria = (props: IAppProps) => {
  const { botId, params, appearance, children, staging } = props;
  const env = getEnvironment(staging as boolean);

  Global.botId = botId;
  Global.params = params;
  Global.env = env;

  const isIphone = Platform.OS === 'ios';

  return (
    <KeyboardAvoidingView behavior={isIphone ? 'padding' : 'height'}>
      <StorageContextProvider>
        <ChatConfigurationsContextProvider
          apiUrl={env.GET_BOT_URL}
          appearance={appearance}
        >
          <SocketContextProvider wsUrl={env.SOCKET_URL}>
            <App customWidget={children} />
          </SocketContextProvider>
        </ChatConfigurationsContextProvider>
      </StorageContextProvider>
    </KeyboardAvoidingView>
  );
};

export type { IBotConfigs } from './types/chatConfigurations';
