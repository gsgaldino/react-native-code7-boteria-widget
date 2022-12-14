import React, { createContext, useContext, useCallback } from 'react';
import { AsyncStorage } from 'react-native';
import { IAsyncStorage, StorageState } from '../types/AsyncStorage';

const storageKey = '@react-native-code7-boteria-widget';

const initialState: IAsyncStorage = {
  clearAsync: async () => {},
  saveDataAsync: async () => {},
  getItemsAsync: async () => {
    return {} as StorageState;
  },
};

const AsyncStorageContext = createContext<IAsyncStorage>(initialState);

const AsyncStorageProvider: React.FC<React.ReactNode> = (props) => {
  const saveDataAsync = useCallback(async (data: StorageState) => {
    const newData = JSON.stringify(data);
    await AsyncStorage.setItem(storageKey, newData);
  }, []);

  const getItemsAsync = async () => {
    const data = await AsyncStorage.getItem(storageKey);
    return JSON.parse(data || '{}') as StorageState;
  };

  const clearAsync = async () => {
    await AsyncStorage.clear();
  };

  return (
    <AsyncStorageContext.Provider
      value={{
        getItemsAsync,
        clearAsync,
        saveDataAsync,
      }}
    >
      {props.children}
    </AsyncStorageContext.Provider>
  );
};

export default AsyncStorageProvider;

export const useAsyncStorage = (): IAsyncStorage =>
  useContext(AsyncStorageContext) as IAsyncStorage;
