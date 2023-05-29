import type { Key, Message } from '../../types';
import type { Storage } from '../ports';
import { Global } from '../../global';
let EncryptedStorage: any;

if (!Global.isExpoApp) {
  EncryptedStorage = require('react-native-encrypted-storage').default;
}

export class EncryptedStorageAdapter implements Storage {
  async store(key: Key, data: string): Promise<void> {
    try {
      const parsed = typeof data === 'object' ? JSON.stringify(data) : data;

      await EncryptedStorage.setItem(key, parsed);
    } catch (error) {
      throw error;
    }
  }

  async retrieve(key: Key): Promise<Message[] | string> {
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
