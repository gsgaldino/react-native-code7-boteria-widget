import type { Message } from '../../types';

export interface DocumentPicker {
  pick(): Promise<Message | null>;
}
