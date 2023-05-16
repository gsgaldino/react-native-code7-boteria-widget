import type { PropsWithChildren } from 'react';
import React, { createContext, useContext } from 'react';

import { Uuid } from '../infra';

type UuidContextProps = {
  uuid: Uuid;
};

const UuidContext = createContext<UuidContextProps>({
  uuid: {} as Uuid,
});

export const useUuid = () => useContext(UuidContext);

type UuidContextProviderProps = PropsWithChildren<{
  uuid: Uuid;
}>;

export default function UuidContextProvider({
  uuid,
  children,
}: UuidContextProviderProps) {
  return (
    <UuidContext.Provider value={{ uuid }}>{children}</UuidContext.Provider>
  );
}
