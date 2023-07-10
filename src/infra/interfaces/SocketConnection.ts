import type { Message, SocketAction } from '../../types';

export type OnMessageCallback = (msg: Message) => void;
export type OnOpenCallback = () => Promise<void>;
export type OnEndConversationCallback = () => Promise<void>;
export type OnLinkCallback = (socketId: string) => Promise<void>;

export interface SocketConnection {
  connect(): void;
  disconnect(): void;
  sendMessage(action: SocketAction): void;
  isConnected(): boolean;

  onMessage(callback: OnMessageCallback): void;
  onOpen(callback: OnOpenCallback): void;
  onEndConversation(callback: OnEndConversationCallback): void;
  onLink(callback: OnLinkCallback): void;
}
