import { MessageList } from './MessageList';
import { Message, From, MessageTypes } from '../types';

jest.mock('react-native-fs', () => ({
  readFile: jest.fn(),
}));

describe('MessageList test suite', () => {
  it('should create a list with initial data', () => {
    const initialData: Message[] = [
      { id: '1', from: From.USER, message: 'yo', type: MessageTypes.TEXT },
      {
        id: '2',
        from: From.BOT,
        message: 'how are ya',
        type: MessageTypes.TEXT,
      },
    ];
    const messageList = new MessageList(initialData);
    expect(messageList.messages.length).toBe(initialData.length);
  });

  it('should add messages', () => {
    const messageList = new MessageList([]);
    messageList.addMessage({
      id: '1',
      from: From.USER,
      message: 'hello',
      type: MessageTypes.TEXT,
    });
    messageList.addMessage({
      id: '2',
      from: From.BOT,
      message: 'hello from bot',
      type: MessageTypes.TEXT,
    });
    expect(messageList.messages).toHaveLength(2);
  });
});
