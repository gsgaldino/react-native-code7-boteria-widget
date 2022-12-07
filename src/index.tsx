import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

import ChatConfigurationsProvider from './context/ChatConfigurations';
import SocketContextComponent from './context/Socket/Component';

import { Chat, Widget as WidgetComponent } from './components';

import { styles } from './styles';

interface ICode7BoteriaProps {
  botId: string;
}

export const Code7Boteria = (props: ICode7BoteriaProps): React.ReactNode => {
  const { botId } = props;

  const isIphone = Platform.OS === 'ios';
  const barStyle = isIphone ? 'dark-content' : 'default';
  const behavior = isIphone ? 'padding' : 'height';

  return (
    <SafeAreaView style={styles.areaView}>
      <StatusBar barStyle={barStyle} />

      <ChatConfigurationsProvider>
        <SocketContextComponent botId={botId}>
          <KeyboardAvoidingView behavior={behavior} style={styles.container}>
            <Chat />
            <WidgetComponent />
          </KeyboardAvoidingView>
        </SocketContextComponent>
      </ChatConfigurationsProvider>
    </SafeAreaView>
  );
};
