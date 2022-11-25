import React from 'react';

import { View } from 'react-native';
import messageComponentByType from './utils/messageComponentByType';

import { Message, MessageTypes } from 'types/Message';
import { useSocketContext } from '../../../../../../context/Socket/Component';

function Messages() {
  const { messages } = useSocketContext();

  return (
    <View>
      {messages.map((msg: Message, index: number) => {
        const type = msg.type as MessageTypes;
        const MessageComponent = messageComponentByType(type);

        return <MessageComponent key={index} {...msg} />;
      })}
    </View>
  );
}

export default Messages;
