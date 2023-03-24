import { Message } from '.';

export interface IAppState {
  messages: Message[];
  addMessage: (msg: Message) => void;
  resetMessages: () => void;
}
