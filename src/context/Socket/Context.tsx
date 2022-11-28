import { createContext } from 'react';
import { ISocketContextState } from 'types/Socket';

export const SocketContext = createContext<ISocketContextState>({
  socket: null,
  handleSubmitMessage: () => {},
  messages: [],
});

export const SocketContextProvider = SocketContext.Provider;

export default SocketContextProvider;
