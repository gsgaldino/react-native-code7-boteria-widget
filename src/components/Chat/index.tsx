import React, { useEffect, useState } from 'react';
import { View, Keyboard } from 'react-native';
import { useChatConfigurations } from '../../context/ChatConfigurations';

import Header from './components/Header';
import Input from './components/Input';
import Messages from './components/Messages';

import { styles } from './styles';

function Chat() {
  const { isChatOpen } = useChatConfigurations();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const isChatOpenClass = isChatOpen ? null : styles.closed;
  const isKeyboardVisibleClass = isKeyboardVisible
    ? styles.visibleKeyboard
    : styles.notVisibleKeyboard;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={[styles.container, isChatOpenClass, isKeyboardVisibleClass]}>
      <Header />
      <Messages />
      <Input />
    </View>
  );
}

export default Chat;
