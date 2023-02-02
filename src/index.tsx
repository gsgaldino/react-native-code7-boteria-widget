import React from 'react';
import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import ChatConfigurationsProvider from './context/ChatConfigurations';
import AsyncStorageContext from './context/AsyncStorage';
import SocketContextComponent from './context/Socket/Component';

import App from './App';

type Code7BoteriaProps = PropsWithChildren<{
  params?: Object;
  botId: string;
}>;

export const Code7Boteria = (props: Code7BoteriaProps) => {
  const { botId, params } = props;

  const isIphone = Platform.OS === 'ios';
  const behavior = isIphone ? 'padding' : 'height';

  return (
    <KeyboardAvoidingView behavior={behavior}>
      <ChatConfigurationsProvider>
        <AsyncStorageContext>
          <SocketContextComponent botId={botId} params={params}>
            <App customWidget={props.children} />
          </SocketContextComponent>
        </AsyncStorageContext>
      </ChatConfigurationsProvider>
    </KeyboardAvoidingView>
  );
};
