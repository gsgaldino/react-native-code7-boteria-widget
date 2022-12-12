import { createContext } from 'react';
import { ISocketContextState } from '../../types/Socket';

export const SocketContext = createContext<ISocketContextState>({
  handleSubmitMessage: () => {},
  messages: [],
  handleCarouselButtonClick: () => {},
});

export const SocketContextProvider = SocketContext.Provider;

export default SocketContextProvider;
