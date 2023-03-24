import { createContext } from 'react';
import { ISocketContextState } from '../../types/socket';

export const SocketContext = createContext<ISocketContextState>({
  disconnect: async () => {},
});

export const SocketContextProvider = SocketContext.Provider;

export default SocketContextProvider;
