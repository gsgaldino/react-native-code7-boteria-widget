import React from 'react';
import type { ICode7BoteriaProps } from './index';
import { ChatComponent } from './ChatComponent';

import { initialConfigs } from './constants';
import { ChatConfigurations } from './entities';

import { SessionStorageGateway } from './gateways/SessionStorageGateway';
import { MessageHttpSocketGateway } from './gateways/MessageHttpSocketGateway';
import { NotificationRnGateway } from './gateways/NotificationRnGateway';

import {
  WebSocketAdapter,
  ConsoleLoggerAdapter,
  AxiosHttpConnectionAdapter,
} from './infra/adapters';

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

  const Storage = props.isExpoApp
    ? require('./infra/adapters/ExpoSecureStoreStorageAdapter')
        .ExpoSecureStoreStorageAdapter
    : require('./infra/adapters/EncryptedStorageAdapter')
        .EncryptedStorageAdapter;

  const storage = new Storage();

  const session = new SessionStorageGateway(storage, httpClient, wsAdapter);

  const NotificationsAdapter = props.isExpoApp
    ? require('./infra/adapters/ExpoNotificationsAdapter')
        .ExpoNotificationsAdapter
    : require('./infra/adapters/NotificationAdapter').NotificationAdapter;
  const notificationAdapter = new NotificationsAdapter();

  const notificationGateway = new NotificationRnGateway(notificationAdapter);

  const messageGateway = new MessageHttpSocketGateway(
    wsAdapter,
    httpClient,
    storage,
    session
  );

  return (
    <>
      <ChatComponent
        sessionGateway={session}
        messagesGateway={messageGateway}
        configurations={configurations}
        notificationGateway={notificationGateway}
        ws={wsAdapter}
      />
    </>
  );
};
