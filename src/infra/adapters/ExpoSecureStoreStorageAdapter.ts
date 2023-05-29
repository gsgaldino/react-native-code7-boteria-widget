import type { Key, Message } from '../../types';
import type { Storage } from '../ports';
import * as SecureStore from 'expo-secure-store';

/**
 * For applications that use expo we provide this storage
 * @see https://docs.expo.dev/versions/latest/sdk/securestore
 */
export class ExpoSecureStoreStorageAdapter implements Storage {
  async store(key: Key, data: string): Promise<void> {
    const parsed = key === 'messages' ? JSON.stringify(data) : data;
    await SecureStore.setItemAsync(key, parsed);
  }

  async retrieve(key: Key): Promise<Message[] | string> {
    const result = await SecureStore.getItemAsync(key);

    if (key === 'messages') {
      /**
       * FIX ME
       * somewhere of application we're stringfying twice
       */
      return result ? JSON.parse(JSON.parse(result)) : [];
    } else {
      return result || '';
    }
  }

  async clean(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync('sessionId'),
      SecureStore.deleteItemAsync('messages'),
    ]);
  }
}
