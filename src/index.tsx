import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import ChatConfigurationsProvider from './context/ChatConfigurations';
import AsyncStorageContext from './context/AsyncStorage';
import SocketContextComponent from './context/Socket/Component';

import App from './App';

interface ICode7BoteriaProps {
  botId: string;
  params?: Object;
  children?: React.ReactNode;
}

export const Code7Boteria = (props: ICode7BoteriaProps): React.ReactNode => {
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
