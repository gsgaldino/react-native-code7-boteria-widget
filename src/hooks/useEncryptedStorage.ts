import { useRef } from 'react';
import { EncryptedStorageProvider } from '../providers';
import { EncryptedStorageKey } from '../types';

import { logger } from '../utils';

export const useEncryptedStorage = () => {
  const storageRef = useRef(new EncryptedStorageProvider());

  const store = async (key: EncryptedStorageKey, data: string | object) => {
    try {
      await storageRef.current.storeData(key, data);
    } catch (error) {
      logger.log(`Error storing data: ${JSON.stringify(error)}`);
    }
  };

  const retrieve = async (key: EncryptedStorageKey) => {
    try {
      const data = await storageRef.current.retrieveData(key);
      return data;
    } catch (error) {
      logger.log(`Error retrieving data: ${JSON.stringify(error)}`);
      return undefined;
    }
  };

  return { store, retrieve, clear: storageRef.current.cleanStorage };
};
