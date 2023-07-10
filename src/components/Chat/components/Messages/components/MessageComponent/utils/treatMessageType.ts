import { Message, MessageTypes } from '../../../../../../../types/message';
import { getFileNameFromUrl } from '../../../../../../../utils/getFilenameFromAttachment';

export const treatMessageType = (msg: Message): Message => {
  if (msg.type === MessageTypes.AUDIO) {
    const filename = getFileNameFromUrl(msg.audio?.fileUrl as string);
    const [, ext] = filename.split('.');

    if (ext === 'oga') {
      return {
        ...msg,
        type: MessageTypes.DOCUMENT,
        document: {
          ...msg.audio,
          fileUrl: msg.audio?.fileUrl as string,
        },
      };
    }
  }

  return msg;
};
