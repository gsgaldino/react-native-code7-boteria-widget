import React, { memo } from 'react';
import type { Message } from '../../../../../../types/message';
import type { ChatConfigurations } from '../../../../../../entities';

import messageComponentByType from '../../utils/messageComponentByType';

export interface IMessageComponentProps
  extends Pick<ChatConfigurations, 'settings'> {
  message: Message;
}

const MessageComponent = (props: IMessageComponentProps) => {
  const MessageComponentByType = messageComponentByType(props.message.type);
  return (
    <MessageComponentByType settings={props.settings} message={props.message} />
  );
};

export default memo(MessageComponent);
