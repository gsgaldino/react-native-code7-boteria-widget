import type { PropsWithChildren } from 'react';
import React, { useRef, useEffect } from 'react';

import { SocketConnection } from '../infra';

type SocketConnectionProviderProps = PropsWithChildren<{
  ws: SocketConnection;
}>;

export const SocketConnectionProvider = ({
  ws,
  children,
}: SocketConnectionProviderProps) => {
  const wsRef = useRef<SocketConnection | null>(null);

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = ws;
      wsRef.current.connect();
    }
  }, [ws]);

  return <>{children}</>;
};
