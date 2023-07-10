import type { OnEndConversationCallback } from '../infra/interfaces/SocketConnection';
import type { Session } from '../entities/Session';
import type { SocketPayload } from '../types';

export interface SessionGateway {
  getCurrent(): Promise<Session>;
  changeSession(newSessionId: string): Promise<string>;
  subscribe(sessionId: string): Promise<Session>;
  clearSession(): Promise<Session>;
  linkSession(): Promise<void>;
  onEndConversation(callback: OnEndConversationCallback): Promise<void>;
  sendAction(action: SocketPayload): Promise<void>;
}
