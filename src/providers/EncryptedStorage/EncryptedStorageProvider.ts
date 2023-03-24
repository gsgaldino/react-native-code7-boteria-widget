import { EncryptedStorageKey } from '../../types';
import { IEncryptedStorageProvider } from '.';
import EncryptedStorage from 'react-native-encrypted-storage';

export class EncryptedStorageProvider implements IEncryptedStorageProvider {
  public async storeData(
    key: EncryptedStorageKey,
    data: string | object
  ): Promise<void> {
    try {
      const parsed = typeof data === 'object' ? JSON.stringify(data) : data;

      await EncryptedStorage.setItem(key, parsed);
    } catch (error) {
      throw error;
    }
  }

  public async retrieveData(key: EncryptedStorageKey): Promise<string | null> {
    try {
      const data = await EncryptedStorage.getItem(key);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async cleanStorage(): Promise<void> {
    try {
      return new Promise((resolve) => {
        EncryptedStorage.clear().then(resolve);
      });
    } catch (error) {
      throw error;
    }
  }
}
