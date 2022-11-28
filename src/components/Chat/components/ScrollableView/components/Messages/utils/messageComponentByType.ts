import Text from '../components/Text';
import Typing from '../components/Typing';
import Image from '../components/Image';
import Video from '../components/Video';

import wrapMessage from './wrapMessage';

import { MessageTypes } from '../../../../../../../types/Message';

export default (type: MessageTypes) => {
  switch (type) {
    case MessageTypes.TYPING:
      return wrapMessage(Typing);

    case MessageTypes.TEXT:
      return wrapMessage(Text);

    case MessageTypes.IMAGE:
      return wrapMessage(Image);

    case MessageTypes.VIDEO:
      return wrapMessage(Video);

    default:
      return wrapMessage(Text);
  }
};
