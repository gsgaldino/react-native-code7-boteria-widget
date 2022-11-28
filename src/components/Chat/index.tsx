import React from 'react';
import { View } from 'react-native';
import { useChatConfigurations } from '../../context/ChatConfigurations';

import Header from './components/Header';
import ScrollableView from './components/ScrollableView';
import Input from './components/Input';

import { styles } from './styles';

function Chat() {
  const { isChatOpen } = useChatConfigurations();

  const isChatOpenClass = isChatOpen ? null : styles.closed;

  return (
    <View style={[styles.container, isChatOpenClass]}>
      <Header />
      <ScrollableView />
      <Input />
    </View>
  );
}

export default Chat;
