import React, { memo } from 'react';
import { Message } from '../../../../../../types/message';

import messageComponentByType from '../../utils/messageComponentByType';

interface IMessageComponentProps {
  message: Message;
}

const MessageComponent = ({ message }: IMessageComponentProps) => {
  const MessageComponentByType = messageComponentByType(message.type);
  return <MessageComponentByType {...(message as Message)} />;
};

export default memo(MessageComponent);
