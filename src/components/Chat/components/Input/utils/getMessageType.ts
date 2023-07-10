import { MessageTypes } from '../../../../../types';

export const getMessageType = (type: string): MessageTypes => {
  switch (type) {
    case 'audio':
      return MessageTypes.AUDIO;
    case 'application':
    case 'msword':
    case 'text':
      return MessageTypes.DOCUMENT;
    case 'video':
      return MessageTypes.VIDEO;
    case 'image':
      return MessageTypes.IMAGE;
    default:
      return MessageTypes.IMAGE;
  }
};
