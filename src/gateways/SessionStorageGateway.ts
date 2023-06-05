import type { SessionGateway } from './SessionGateway';
import type { HttpConnection, SocketConnection, Storage } from '../infra';
import type { OnEndConversationCallback } from '../infra/ports/SocketConnection';
import type { SocketPayload } from '../types';

import { Session } from '../entities/Session';
import { Global } from '../global';
import { channel } from '../constants';

export class SessionStorageGateway implements SessionGateway {
  constructor(
    private readonly storage: Storage,
    private readonly httpClient: HttpConnection,
    private readonly ws: SocketConnection
  ) {}

  async sendAction(action: SocketPayload): Promise<void> {
    const sessionId = await this.storage.retrieve('sessionId');
    await this.httpClient.post('/webchat/action', {
      botId: Global.botId,
      action,
      sessionId,
    });
  }

  public async subscribe(sessionId: string): Promise<Session> {
    const response = await this.httpClient.post('/webchat/subscribe', {
      sessionId,
      botId: Global.botId,
      parameters: JSON.stringify(Global.params),
      socketId: Global.socketId,
      channel,
    });
    const newSessionId = response?.sessionId || '';
    this.changeSession(newSessionId);
    return new Session(newSessionId);
  }

  public async getCurrent(): Promise<Session> {
    const sessionId = await this.storage.retrieve('sessionId');
    if (typeof sessionId === 'string') {
      return new Session(sessionId);
    }
    return new Session('');
  }

  public async changeSession(newSessionId: string): Promise<string> {
    await this.storage.store('sessionId', newSessionId);
    return newSessionId;
  }

  public async clearSession(): Promise<Session> {
    const session = '';
    await this.storage.clean();
    return new Session(session);
  }

  public async linkSession(): Promise<void> {
    const sessionId = await this.storage.retrieve('sessionId');
    if (typeof sessionId === 'string') {
      this.ws.sendMessage({
        action: 'link',
        data: {
          sessionId,
          botId: Global.botId,
        },
      });
    }
  }

  public async onEndConversation(
    callback: OnEndConversationCallback
  ): Promise<void> {
    this.ws.onEndConversation(callback);
  }
}
