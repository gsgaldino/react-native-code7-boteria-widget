import React from 'react';
import type { ICode7BoteriaProps } from './index';
import { ChatComponent } from './ChatComponent';
import { initialConfigs } from './constants';
import { ChatConfigurations } from './entities';
import { SessionStorageGateway } from './gateways/SessionStorageGateway';
import { MessageHttpSocketGateway } from './gateways/MessageHttpSocketGateway';
import { ChatConfigurationsHttpGateway } from './gateways/ChatConfigurationsHttpGateway';
import {
  WebSocketAdapter,
  ConsoleLoggerAdapter,
  AxiosHttpConnectionAdapter,
} from './infra/adapters';
import { EncryptedStorageAdapter } from './infra/adapters/EncryptedStorageAdapter';
import { getEnvironment } from './utils';
import { Global } from './global';

export const Provider = (props: ICode7BoteriaProps) => {
  Global.botId = props.botId;
  Global.params = props.params;

  const env = getEnvironment(props.staging as boolean);

  const configurations = new ChatConfigurations(
    initialConfigs.title,
    initialConfigs.poweredBy,
    initialConfigs.poweredByUrl,
    initialConfigs.settings
  );
  const logger = new ConsoleLoggerAdapter();
  const wsAdapter = new WebSocketAdapter(env.SOCKET_URL, logger);
  const httpClient = new AxiosHttpConnectionAdapter(env.API_URL, logger);

  const storage = new EncryptedStorageAdapter();

  const session = new SessionStorageGateway(storage, httpClient, wsAdapter);

  const messageGateway = new MessageHttpSocketGateway(
    wsAdapter,
    httpClient,
    storage,
    session
  );

  const getBotHttpClient = new AxiosHttpConnectionAdapter(
    env.GET_BOT_URL,
    logger
  );
  const chatConfigurationsGateway = new ChatConfigurationsHttpGateway(
    getBotHttpClient
  );

  return (
    <>
      <ChatComponent
        sessionGateway={session}
        messagesGateway={messageGateway}
        configurations={configurations}
        configurationsGateway={chatConfigurationsGateway}
        ws={wsAdapter}
        appearance={props.appearance}
      />
    </>
  );
};
