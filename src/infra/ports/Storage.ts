import { Key } from '../../types';

export interface Storage {
  store(key: Key, data: string): Promise<void>;
  retrieve(key: Key): Promise<string | null>;
  clean(): Promise<void>;
}
