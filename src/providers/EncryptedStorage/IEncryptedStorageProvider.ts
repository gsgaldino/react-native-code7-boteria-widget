import { EncryptedStorageKey } from '../../types';

export interface IEncryptedStorageProvider {
  storeData(key: EncryptedStorageKey, data: string): Promise<void>;
  retrieveData(key: EncryptedStorageKey): Promise<string | null>;
  cleanStorage(): Promise<void>;
}
