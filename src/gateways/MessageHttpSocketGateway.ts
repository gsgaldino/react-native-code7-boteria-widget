import { Message, MessageStatus, MessageTypes } from '../types';
import { MessageGateway } from './MessageGateway';
import { SocketConnection, HttpConnection, Storage } from '../infra';
import { OnMessageCallback } from '../infra/ports/SocketConnection';
import { MessageList } from '../entities/MessageList';

import { channel } from '../constants';
import { Global } from '../global';
import { SessionGateway } from './SessionGateway';

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
    return new MessageList(JSON.parse(messages as string) || []);
  }

  async sendMessage(msg: Message): Promise<any> {
    const messagesData = JSON.parse(
      (await this.storage.retrieve('messages')) || '[]'
    );
    messagesData.push(msg);
    await this.storage.store('messages', JSON.stringify(messagesData));
    const sessionId = await this.sessionGateway.getCurrent();
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

  async storeMessage(msg: any) {
    const messages = JSON.parse(
      (await this.storage.retrieve('messages')) || '[]'
    );
    messages.push(msg);
    await this.storage.store('messages', JSON.stringify(messages));
    return new MessageList(messages);
  }

  async clearMessages(): Promise<MessageList> {
    const messageList: Message[] = [];
    await this.storage.store('messages', JSON.stringify(messageList));

    return new MessageList(messageList);
  }

  onMessage(callback: OnMessageCallback): void {
    this.ws.onMessage(callback);
  }
}
