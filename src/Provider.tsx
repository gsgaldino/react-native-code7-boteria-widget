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
  EncryptedStorageAdapter,
  ExpoSecureStoreStorageAdapter,
  NotificationAdapter,
  ExpoNotificationsAdapter,
} from './infra/adapters';

import { getEnvironment } from './utils';
import { Global } from './global';

export const Provider = (props: ICode7BoteriaProps) => {
  Global.botId = props.botId;
  Global.params = props.params;

  const env = getEnvironment(props.staging as boolean);
  const isExpoApp = true;

  const configurations = new ChatConfigurations(
    initialConfigs.title,
    initialConfigs.poweredBy,
    initialConfigs.poweredByUrl,
    initialConfigs.settings
  );
  const logger = new ConsoleLoggerAdapter();
  const wsAdapter = new WebSocketAdapter(env.SOCKET_URL, logger);
  const httpClient = new AxiosHttpConnectionAdapter(env.API_URL, logger);
  const storage = isExpoApp
    ? new ExpoSecureStoreStorageAdapter()
    : new EncryptedStorageAdapter();
  const session = new SessionStorageGateway(storage, httpClient, wsAdapter);
  const messageGateway = new MessageHttpSocketGateway(
    wsAdapter,
    httpClient,
    storage,
    session
  );
  const notificationAdapter = isExpoApp
    ? new ExpoNotificationsAdapter()
    : new NotificationAdapter();
  const notificationGateway = new NotificationRnGateway(notificationAdapter);

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
