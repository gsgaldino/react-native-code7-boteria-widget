import { Key } from '../../types';
import { Storage } from '../ports';
import EncryptedStorage from 'react-native-encrypted-storage';

export class EncryptedStorageAdapter implements Storage {
  async store(key: Key, data: string): Promise<void> {
    try {
      const parsed = typeof data === 'object' ? JSON.stringify(data) : data;

      await EncryptedStorage.setItem(key, parsed);
    } catch (error) {
      throw error;
    }
  }
  async retrieve(key: Key): Promise<string | null> {
    try {
      return await EncryptedStorage.getItem(key);
    } catch (error) {
      throw error;
    }
  }
  async clean(): Promise<void> {
    try {
      await EncryptedStorage.clear();
    } catch (error) {
      throw error;
    }
  }
}
