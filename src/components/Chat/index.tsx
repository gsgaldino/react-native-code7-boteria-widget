import React from 'react';
import { View } from 'react-native';
import { useIsChatOpen } from '../../context/IsChatOpen';

import Header from './components/Header';
import ScrollableView from './components/ScrollableView';
import Input from './components/Input';

import { styles } from './styles';

function Chat() {
  const { isChatOpen } = useIsChatOpen();

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
