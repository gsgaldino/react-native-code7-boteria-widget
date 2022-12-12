import React from 'react';
import { Message } from 'src/types/Message';

import messageComponentByType from '../../utils/messageComponentByType';

interface IMessageComponentProps {
  message: Message;
}

const MessageComponent = ({ message }: IMessageComponentProps) => {
  const MessageComponentByType = messageComponentByType(message.type);
  return <MessageComponentByType {...(message as Message)} />;
};

export default MessageComponent;
