import React from 'react';
import type { ICode7BoteriaProps } from './index';
import { ChatComponent } from './ChatComponent';
import { initialConfigs } from './constants';
import { ChatConfigurations } from './entities';

import {
  ChatConfigurationsHttpGateway,
  MessageHttpSocketGateway,
  NotificationRnGateway,
  SessionStorageGateway,
} from './gateways';

import {
  WebSocketAdapter,
  ConsoleLoggerAdapter,
  AxiosHttpConnectionAdapter,
  EncryptedStorageAdapter,
  NotificationAdapter,
} from './infra/adapters';

import { getEnvironment } from './utils';
import { Global } from './global';

export const Provider = (props: ICode7BoteriaProps) => {
  Global.botId = props.botId;
  Global.params = props.params;

  const env = getEnvironment({
    staging: props.staging,
    dev: props.dev,
  });

  const configurations = new ChatConfigurations(
    initialConfigs.title,
    initialConfigs.poweredBy,
    initialConfigs.poweredByUrl,
    {}
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
  const notificationAdapter = new NotificationAdapter();
  const notificationsGateway = new NotificationRnGateway(notificationAdapter);

  return (
    <>
      <ChatComponent
        sessionGateway={session}
        messagesGateway={messageGateway}
        configurations={configurations}
        configurationsGateway={chatConfigurationsGateway}
        notifications={notificationsGateway}
        ws={wsAdapter}
        appearance={props.appearance}
      />
    </>
  );
};
