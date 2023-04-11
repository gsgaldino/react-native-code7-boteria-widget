import { SocketAction, Message } from '../types';
import { logger } from '../utils';
import { Global } from '../global';

export type OnMessageCallback = (msg: Message) => void;
export type OnOpenCallback = () => Promise<void>;
export type OnCloseCallback = () => void;
export type OnErrorCallback = (event: WebSocketErrorEvent) => void;

export class ChatbotWebSocket {
  private ws: WebSocket | null = null;
  private onMessageCallback: OnMessageCallback | null = null;
  private onOpenCallback: OnOpenCallback | null = null;
  private connectionTries = 0;
  private readonly maxTries = 5;

  constructor(private readonly url: string) {}

  public onMessage(callback: OnMessageCallback) {
    this.onMessageCallback = callback;
  }

  public onOpen(callback: OnOpenCallback) {
    this.onOpenCallback = callback;
  }

  public connect() {
    if (this.connectionTries >= this.maxTries) {
      console.log(
        `Maximum number of connection tries (${this.maxTries}) reached.`
      );
      return;
    }

    this.connectionTries++;

    this.ws = new WebSocket(this.url);
    console.log('CREATING SOCKET WITH:', this.url);

    this.ws.onopen = () => {
      this.connectionTries = 0;
      if (this.onOpenCallback) this.onOpenCallback();
    };

    this.ws.onclose = (event) => {
      logger.log(
        `Socket is closed. Reconnect will be attempted in 1 second. ${event.reason}`
      );

      setTimeout(() => {
        this.connect();
      }, 1000);
    };

    this.ws.onerror = (err) => {
      logger.log(`Socket encountered error: ${JSON.stringify(err)}`);
      this.ws?.close();
    };

    this.ws.onmessage = (event) => {
      console.log('NEW MESSAGE!', event);
      const socketAction = JSON.parse(event.data) as SocketAction;
      if (socketAction.action === 'link') {
        const socketId = socketAction.data?.socketId || null;
        Global.socketId = socketId || null;
      }
      if (socketAction.action === 'message' && this.onMessageCallback) {
        this.onMessageCallback(socketAction.data as unknown as Message);
      }
    };
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  public sendMessage(action: SocketAction) {
    if (this.ws) {
      this.ws.send(JSON.stringify(action));
    }
  }
}
