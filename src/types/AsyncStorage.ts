import { Message } from './Message';

export type StorageState = {
  messages: Message[];
  sessionId: string;
};

export interface IAsyncStorage {
  getItemsAsync: () => Promise<StorageState>;
  saveDataAsync: (data: StorageState) => Promise<void>;
  clearAsync: () => Promise<unknown>;
}
