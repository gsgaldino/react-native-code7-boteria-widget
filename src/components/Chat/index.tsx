import React from 'react';
import { Modal } from 'react-native';
import { useChatConfigurations } from '../../context/ChatConfigurations';

import Header from './components/Header';
import Messages from './components/Messages';
import Input from './components/Input';
import Footer from './components/Footer';

function Chat() {
  const { isChatOpen } = useChatConfigurations();

  return (
    <Modal visible={isChatOpen} animationType="slide">
      <Header />
      <Messages />
      <Input />
      <Footer />
    </Modal>
  );
}

export default Chat;
