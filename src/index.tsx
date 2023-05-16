import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import App from './App';
import { Global } from './global';
import { getEnvironment } from './utils';
import { IAppProps } from './types';

import {
  AxiosHttpConnectionAdapter,
  WebSocketAdapter,
  ConsoleLoggerAdapter,
  EncryptedStorageAdapter,
  MathUuidAdapter,
} from './infra';

import { MessageHttpSocketGateway } from './gateways/MessageHttpSocketGateway';
import { ChatConfigurationsHttpGateway } from './gateways/ChatConfigurationsHttpGateway';
import { SessionStorageGateway } from './gateways/SessionStorageGateway';

import UuidContextProvider from './context/UuidContext';
import {
  SocketConnectionProvider,
  ChatConfigurationsProvider,
  MessageListProvider,
  SessionProvider,
} from './providers';

export const Code7Boteria = ({
  botId,
  params,
  appearance,
  children,
  staging,
}: IAppProps) => {
  const env = getEnvironment(staging as boolean);

  Global.botId = botId;
  Global.params = params;
  Global.env = env;

  const logger = new ConsoleLoggerAdapter();
  const wsAdapter = new WebSocketAdapter(env.SOCKET_URL, logger);
  const axiosAdapterApi = new AxiosHttpConnectionAdapter(env.API_URL, logger);
  const axiosAdapterGetBot = new AxiosHttpConnectionAdapter(
    env.GET_BOT_URL,
    logger
  );
  const chatConfigurationsGateway = new ChatConfigurationsHttpGateway(
    axiosAdapterGetBot
  );
  const storage = new EncryptedStorageAdapter();

  const sessionGateway = new SessionStorageGateway(
    storage,
    axiosAdapterApi,
    wsAdapter
  );

  const messageGateway = new MessageHttpSocketGateway(
    wsAdapter,
    axiosAdapterApi,
    storage,
    sessionGateway
  );

  const uuidAdapter = new MathUuidAdapter();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <UuidContextProvider uuid={uuidAdapter}>
        <SocketConnectionProvider ws={wsAdapter}>
          <ChatConfigurationsProvider
            configurations={chatConfigurationsGateway}
            appearance={appearance}
          >
            <SessionProvider sessionGateway={sessionGateway}>
              <MessageListProvider messageGateway={messageGateway}>
                <App customWidget={children} />
              </MessageListProvider>
            </SessionProvider>
          </ChatConfigurationsProvider>
        </SocketConnectionProvider>
      </UuidContextProvider>
    </KeyboardAvoidingView>
  );
};

export type { ChatConfigurationsType as IBotConfigs } from './types/chatConfigurations';
