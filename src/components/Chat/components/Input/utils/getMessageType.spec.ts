import { getMessageType } from './getMessageType';
import { MessageTypes } from '../../../../../types';

describe('getMessageType test suite', () => {
  it('Should get audio type', () => {
    const type = 'audio';
    expect(getMessageType(type)).toBe(MessageTypes.AUDIO);
  });

  it('Should get video type', () => {
    const type = 'video';
    expect(getMessageType(type)).toBe(MessageTypes.VIDEO);
  });

  it('Should get image type', () => {
    const type = 'image';
    expect(getMessageType(type)).toBe(MessageTypes.IMAGE);
  });

  it('Should get document type', () => {
    ['application', 'msword', 'text']
      .map((type) => getMessageType(type))
      .forEach((result) => expect(result).toBe(MessageTypes.DOCUMENT));
  });
});
