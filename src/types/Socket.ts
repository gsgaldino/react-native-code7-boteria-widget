import { Socket } from 'socket.io-client';

export interface ISocketContextState {
  socket: Socket | null;
}
