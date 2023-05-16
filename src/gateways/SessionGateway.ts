import { OnEndConversationCallback } from '../infra/ports/SocketConnection';
import { Session } from '../entities/Session';
import { SocketPayload } from '../types';

export interface SessionGateway {
  getCurrent(): Promise<string>;
  changeSession(newSessionId: string): Promise<string>;
  subscribe(sessionId: string): Promise<Session>;
  clearSession(): Promise<Session>;
  linkSession(): Promise<void>;
  onEndConversation(callback: OnEndConversationCallback): Promise<void>;
  sendAction(action: SocketPayload): Promise<void>;
}
