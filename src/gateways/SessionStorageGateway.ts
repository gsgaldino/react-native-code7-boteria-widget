import { SessionGateway } from './SessionGateway';
import { HttpConnection, SocketConnection, Storage } from '../infra';

import { Session } from '../entities/Session';
import { Global } from '../global';
import { OnEndConversationCallback } from '../infra/ports/SocketConnection';
import { SocketPayload } from 'src/types';

export class SessionStorageGateway implements SessionGateway {
  constructor(
    private readonly storage: Storage,
    private readonly httpClient: HttpConnection,
    private readonly ws: SocketConnection
  ) {}

  async sendAction(action: SocketPayload): Promise<void> {
    const sessionId = await this.getCurrent();
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
    });

    this.changeSession(response.sessionId);

    return new Session(response.sessionId);
  }

  public async getCurrent(): Promise<string> {
    const sessionId = await this.storage.retrieve('sessionId');
    return sessionId || '';
  }

  public async changeSession(newSessionId: string): Promise<string> {
    await this.storage.store('sessionId', newSessionId);
    return newSessionId;
  }

  public async clearSession(): Promise<Session> {
    const session = '';
    await this.storage.store('sessionId', session);

    return new Session(session);
  }

  public async linkSession(): Promise<void> {
    const sessionId = await this.getCurrent();

    this.ws.sendMessage({
      action: 'link',
      data: {
        sessionId,
        botId: Global.botId,
      },
    });
  }

  public async onEndConversation(
    callback: OnEndConversationCallback
  ): Promise<void> {
    this.ws.onEndConversation(callback);
  }
}
