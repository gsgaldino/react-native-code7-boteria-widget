import Text from '../components/Text';
import Typing from '../components/Typing';
import Image from '../components/Image';
import Video from '../components/Video';
import Audio from '../components/Audio';
import Document from '../components/Document';
import Carousel from '../components/Carousel';

import wrapMessage from './wrapMessage';

import { MessageTypes } from '../../../../../types/Message';

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

    case MessageTypes.AUDIO:
      return wrapMessage(Audio);

    case MessageTypes.DOCUMENT:
      return wrapMessage(Document);

    case MessageTypes.CAROUSEL:
      return wrapMessage(Carousel);

    default:
      return wrapMessage(Text);
  }
};
