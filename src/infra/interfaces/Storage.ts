import type { Key, Message } from '../../types';

export interface Storage {
  store(key: Key, data: string): Promise<void>;
  retrieve(key: Key): Promise<Message[] | string>;
  clean(): Promise<void>;
}
