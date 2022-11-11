import React from 'react';

import { View } from 'react-native';
import messageComponentByType from './utils/messageComponentByType';

import { useMessages } from '../../../../../../context/Messages';

function Messages() {
  const { messages } = useMessages();

  return (
    <View>
      {messages.map((msg: any, index: number) => {
        const Message = messageComponentByType(msg?.type);

        return <Message key={index} message={msg.message} from={msg.from} />;
      })}
    </View>
  );
}

export default Messages;
