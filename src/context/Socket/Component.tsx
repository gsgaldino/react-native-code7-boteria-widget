import React, { useContext } from 'react';

import { SocketContextProvider, SocketContext } from './Context';
// import { useChatConfigurations } from '../ChatConfigurations';
import { useSocket } from '../../hooks';

import { ISocketContextState } from '../../types/socket';

const SocketContextComponent: React.FC<{ wsUrl: string }> = ({
  children,
  wsUrl,
}) => {
  const { disconnect } = useSocket(wsUrl);
  // const { fetchBotAndUpdateConfigs } = useChatConfigurations();

  // useEffect(() => {
  //   (async () => {
  //     await fetchBotAndUpdateConfigs();
  //   })();
  // }, []);

  return (
    <SocketContextProvider value={{ disconnect }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
export const useSocketContext = () =>
  useContext(SocketContext) as ISocketContextState;
