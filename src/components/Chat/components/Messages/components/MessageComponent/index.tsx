import React, { memo } from 'react';
import type { Message } from '../../../../../../types/message';
import type { ChatConfigurations } from '../../../../../../entities';

import messageComponentByType from '../../utils/messageComponentByType';
import { treatMessageType } from './utils/treatMessageType';

export interface IMessageComponentProps
  extends Pick<ChatConfigurations, 'settings'> {
  message: Message;
  sendNotification: (title: string, message: string, filePath?: string) => void;
  handlOpenModalImage: (param: string) => void;
}

const MessageComponent = (props: IMessageComponentProps) => {
  const message = treatMessageType(props.message);
  const MessageComponentByType = messageComponentByType(message.type);

  return (
    <MessageComponentByType
      sendNotification={props.sendNotification}
      settings={props.settings}
      message={message}
      handlOpenModalImage={props.handlOpenModalImage}
    />
  );
};

export default memo(MessageComponent);
