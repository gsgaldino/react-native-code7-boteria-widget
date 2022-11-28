import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

import IsChatOpenProvider from './context/ChatConfigurations';
import SocketContextComponent from './context/Socket/Component';

import { Chat, Widget as WidgetComponent } from './components';

import { styles } from './styles';

interface ICode7BoteriaProps {
  botId: string;
}

export function Code7Boteria(props: ICode7BoteriaProps) {
  const { botId } = props;

  const isIphone = Platform.OS === 'ios';
  const barStyle = isIphone ? 'dark-content' : 'default';
  const behavior = isIphone ? 'padding' : 'height';

  return (
    <SafeAreaView>
      <StatusBar barStyle={barStyle} />

      <IsChatOpenProvider>
        <SocketContextComponent botId={botId}>
          <KeyboardAvoidingView behavior={behavior} style={styles.container}>
            <Chat />
            <WidgetComponent />
          </KeyboardAvoidingView>
        </SocketContextComponent>
      </IsChatOpenProvider>
    </SafeAreaView>
  );
}
