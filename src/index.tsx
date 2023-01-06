import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

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
  const barStyle = isIphone ? 'dark-content' : 'default';
  const behavior = isIphone ? 'padding' : 'height';

  return (
    <SafeAreaView style={styles.areaView}>
      <StatusBar barStyle={barStyle} />

      {/* <AsyncStorageContext> */}
      <ChatConfigurationsProvider>
        <SocketContextComponent botId={botId} params={params}>
          <KeyboardAvoidingView behavior={behavior} style={styles.container}>
            <App customWidget={props.children} />
          </KeyboardAvoidingView>
        </SocketContextComponent>
      </ChatConfigurationsProvider>
      {/* </AsyncStorageContext> */}
    </SafeAreaView>
  );
};
