import { Socket } from 'socket.io-client';
import { Message } from './Message';

export interface ISocketContextState {
  socket: Socket | null;
  handleSubmitMessage: Function;
  messages: Message[];
}
