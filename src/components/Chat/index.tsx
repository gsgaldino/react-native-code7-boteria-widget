import React from 'react';
import { Modal } from 'react-native';

import { Header } from './components/Header';
import { MessageList } from './components/Messages';
import { Input } from './components/Input';
import { Footer } from './components/Footer';

import type { ChatConfigurations } from '../../entities';
import type { Message } from '../../types';

interface IChatProps {
  configurations: ChatConfigurations;
  messages: Message[];
  toggle?: () => void;
  close: () => void;
  restartConversation: () => void;
  sendMessage: (msg: Message) => void;
}

export const Chat = ({
  messages,
  configurations,
  close,
  restartConversation,
  sendMessage,
}: IChatProps) => {
  return (
    <Modal visible={configurations.isOpen} animationType="slide">
      <Header
        title={configurations.title || ''}
        mainColor={configurations?.settings?.mainColor}
        restartConversation={restartConversation}
        close={close}
        botFab={configurations?.settings?.botFab}
      />
      <MessageList data={messages} settings={configurations.settings} />
      <Input sendMessage={sendMessage} />
      {configurations.poweredBy && (
        <Footer
          poweredBy={configurations.poweredBy}
          poweredByUrl={configurations.poweredByUrl || ''}
        />
      )}
    </Modal>
  );
};
