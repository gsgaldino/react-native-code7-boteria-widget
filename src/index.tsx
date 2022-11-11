import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

import IsChatOpenProvider from './context/IsChatOpen';
import MessagesProvider from './context/Messages';

import { Chat, Widget as WidgetComponent } from './components';

import { styles } from './styles';

// interface IWidgetProps {
//   botId: string;
// }

export function Widget() {
  const isIphone = Platform.OS === 'ios';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isIphone ? 'dark-content' : 'default'} />

      <IsChatOpenProvider>
        <MessagesProvider>
          <KeyboardAvoidingView
            behavior={isIphone ? 'padding' : 'height'}
            style={styles.container}
          >
            <Chat />
            <WidgetComponent />
          </KeyboardAvoidingView>
        </MessagesProvider>
      </IsChatOpenProvider>
    </SafeAreaView>
  );
}
