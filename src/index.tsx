import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import ChatConfigurationsProvider from './context/ChatConfigurations';
// import AsyncStorageContext from './context/AsyncStorage';
import SocketContextComponent from './context/Socket/Component';

import App from './App';
import { styles } from './styles';

interface ICode7BoteriaProps {
  botId: string;
  params: Object;
  children?: React.ReactNode;
}

export const Code7Boteria = (props: ICode7BoteriaProps): React.ReactNode => {
  const { botId, params } = props;

  const isIphone = Platform.OS === 'ios';
  const behavior = isIphone ? 'padding' : 'height';

  return (
    <>
      {/* <AsyncStorageContext> */}
      <ChatConfigurationsProvider>
        <SocketContextComponent botId={botId} params={params}>
          <KeyboardAvoidingView behavior={behavior} style={styles.container}>
            <App customWidget={props.children} />
          </KeyboardAvoidingView>
        </SocketContextComponent>
      </ChatConfigurationsProvider>
      {/* </AsyncStorageContext> */}
    </>
  );
};
