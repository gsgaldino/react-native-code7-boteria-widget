import { Observable } from './Observable';
import { Message, MessageTypes, MessageStatus } from '../types';
import { getHourAndMinutes } from '../utils';

export class MessageList extends Observable {
  messages: Message[];

  constructor(initialData: Message[] = []) {
    super();
    this.messages = initialData;
  }

  public addMessage(incomingMessage: Message) {
    const messages = this.messages.filter(
      (msg) => msg.type !== MessageTypes.TYPING
    );

    const message: Message = {
      ...incomingMessage,
      hour: getHourAndMinutes(),
    };

    messages.push(message);
    this.messages = messages;
    this.notify('addMessage', message);
  }

  public changeStatus(id: string, status: MessageStatus) {
    this.messages = this.messages.map((msg: any) => {
      if (msg.id === id) return { ...msg, status };
      return msg;
    });
  }

  public clearMessages() {
    this.messages = [];
    this.notify('clearMessages', null);
  }
}
