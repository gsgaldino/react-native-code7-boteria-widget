import type { MessageStatus } from '../types';
import type { MessageList } from '../entities/MessageList';

export interface MessageGateway {
  getMessages(): Promise<MessageList>;
  sendMessage(msg: any): Promise<any>;
  onMessage(callback: Function): void;
  storeMessage(msg: any): Promise<MessageList>;
  clearMessages(): Promise<MessageList>;
  sendStatus(messageId: string, status: MessageStatus): Promise<void>;
}
