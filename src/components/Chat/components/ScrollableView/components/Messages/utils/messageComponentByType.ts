import Text from '../components/Text';
import Typing from '../components/Typing';
import wrapMessage from './wrapMessage';

import { MessageTypes } from '../../../../../../../types/Message';

export default (type: MessageTypes) => {
  switch (type) {
    case MessageTypes.TYPING:
      return wrapMessage(Typing);

    case MessageTypes.TEXT:
      return wrapMessage(Text);

    default:
      return wrapMessage(Text);
  }
};
