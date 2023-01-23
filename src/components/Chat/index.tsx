import React from 'react';
import { Modal } from 'react-native';
import { useChatConfigurations } from '../../context/ChatConfigurations';

import Header from './components/Header';
import Messages from './components/Messages';
import Input from './components/Input';

function Chat() {
  const { isChatOpen } = useChatConfigurations();

  return (
    <Modal visible={isChatOpen} animationType="slide">
      <Header />
      <Messages />
      <Input />
    </Modal>
  );
}

export default Chat;
