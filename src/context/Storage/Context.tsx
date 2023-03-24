import { createContext } from 'react';
import { IAppState } from '../../types';

const defaultAppState: IAppState = {
  messages: [],
  addMessage: () => {},
  resetMessages: () => {},
};

const StorageContext = createContext<IAppState>(defaultAppState);
const StorageContextProvider = StorageContext.Provider;

export { StorageContext, StorageContextProvider };
