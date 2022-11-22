import React from 'react';

import { View } from 'react-native';
import messageComponentByType from './utils/messageComponentByType';

import { Message } from 'types/Message';
import { useMessages } from '../../../../../../context/Messages';

function Messages() {
  const { messages } = useMessages();

  return (
    <View>
      {messages.map((msg: Message, index: number) => {
        const MessageComponent = messageComponentByType(msg?.type);

        return (
          <MessageComponent key={index} message={msg.message} from={msg.from} />
        );
      })}
    </View>
  );
}

export default Messages;
