import { Message, MessageStatus, MessageTypes } from '../types';
import type { MessageGateway } from './MessageGateway';
import type { SocketConnection, HttpConnection, Storage } from '../infra';
import type { OnMessageCallback } from '../infra/ports/SocketConnection';
import { MessageList } from '../entities/MessageList';

import { channel } from '../constants';
import { Global } from '../global';
import type { SessionGateway } from './SessionGateway';

export class MessageHttpSocketGateway implements MessageGateway {
  constructor(
    private readonly ws: SocketConnection,
    private readonly httpConnection: HttpConnection,
    private readonly storage: Storage,
    private readonly sessionGateway: SessionGateway
  ) {}

  async sendStatus(messageId: string, status: MessageStatus): Promise<void> {
    const sessionId = await this.sessionGateway.getCurrent();

    const payload = {
      sessionId,
      botId: Global.botId,
      status,
      messageId,
    };

    await this.httpConnection.post('/webchat/status', payload);
  }

  async getMessages(): Promise<MessageList> {
    const messages = await this.storage.retrieve('messages');

    if (typeof messages === 'object') {
      return new MessageList(messages);
    }

    return new MessageList([]);
  }

  async sendMessage(msg: Message): Promise<any> {
    const messagesData = await this.storage.retrieve('messages');

    if (typeof messagesData === 'object') {
      messagesData.push(msg);
      await this.storage.store('messages', JSON.stringify(messagesData));
      const sessionId = await this.storage.retrieve('sessionId');
      if (!sessionId) {
        await this.sessionGateway.subscribe('');
      } else {
        this.httpConnection.post('/webchat/message', {
          botId: Global.botId,
          message: msg.message,
          isMedia: msg.type !== MessageTypes.TEXT,
          ext: msg.ext,
          sessionId: sessionId,
          botChannel: channel,
          isPreview: false,
          socketId: Global.socketId,
        });
      }

      return new MessageList(messagesData);
    }
  }

  async storeMessage(msg: any) {
    const stored = await this.storage.retrieve('messages');

    if (typeof stored === 'object') {
      stored.push(msg);
      await this.storage.store('messages', JSON.stringify(stored));
      return new MessageList(stored);
    }

    return new MessageList([]);
  }

  clearMessages(): Promise<MessageList> {
    return Promise.resolve(new MessageList([]));
  }

  onMessage(callback: OnMessageCallback): void {
    this.ws.onMessage(callback);
  }
}
