import type { Key, Message } from '../../types';
import type { Storage } from '../interfaces';
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

  async retrieve(key: Key): Promise<Message[] | string> {
    try {
      const result = await EncryptedStorage.getItem(key);

      if (key === 'messages') {
        const messages = result || '[]';
        return JSON.parse(messages);
      }

      return result || '';
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
