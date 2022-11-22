import React, { createContext, useContext, useEffect } from 'react';
import { ISocketContextState } from 'types/Socket';
import { useSocket as useSocketHook } from '../../hooks/useSocket';

const socketUrl = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3335';

const SocketContext = createContext<ISocketContextState>({
  socket: null,
});

const SocketContextProvider: React.FC<React.ReactNode> = (props) => {
  const { children } = props;
  const state: ISocketContextState = {
    socket: useSocketHook(socketUrl),
  };

  useEffect(() => {}, []);

  return (
    <SocketContext.Provider value={state}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;

export const useSocket = () => useContext(SocketContext) as ISocketContextState;
