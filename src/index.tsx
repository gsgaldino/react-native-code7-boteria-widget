import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

import IsChatOpenProvider from './context/IsChatOpen';
import SocketContextComponent from './context/Socket/Component';

import { Chat, Widget as WidgetComponent } from './components';

import { styles } from './styles';

// interface IWidgetProps {
//   botId: string;
// }

export function Code7Boteria() {
  const isIphone = Platform.OS === 'ios';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isIphone ? 'dark-content' : 'default'} />

      <IsChatOpenProvider>
        <SocketContextComponent>
          <KeyboardAvoidingView
            behavior={isIphone ? 'padding' : 'height'}
            style={styles.container}
          >
            <Chat />
            <WidgetComponent />
          </KeyboardAvoidingView>
        </SocketContextComponent>
      </IsChatOpenProvider>
    </SafeAreaView>
  );
}
