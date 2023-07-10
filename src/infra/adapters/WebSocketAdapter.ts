import { Global } from '../../global';
import type { Message, SocketAction } from '../../types';
import type { SocketConnection, Logger } from '../interfaces';
import type {
  OnMessageCallback,
  OnOpenCallback,
  OnEndConversationCallback,
  OnLinkCallback,
} from '../interfaces/SocketConnection';

export class WebSocketAdapter implements SocketConnection {
  private ws: WebSocket | null = null;
  private onMessageCallback: OnMessageCallback | null = null;
  private onOpenCallback: OnOpenCallback | null = null;
  private onEndConversationCallback: OnEndConversationCallback | null = null;
  private onLinkCallback: OnLinkCallback | null = null;

  private connectionTries = 0;
  private readonly maxConnectionTries = 3;
  private keepAliveInterval: NodeJS.Timeout | null = null;
  private messageQueue: SocketAction[] = [];

  constructor(private readonly url: string, private readonly logger: Logger) {}

  public connect(): void {
    if (this.connectionTries >= this.maxConnectionTries) {
      this.logger.log(
        `Maximum number of connection tries (${this.maxConnectionTries}) reached.`
      );
      return;
    }

    this.connectionTries++;

    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.connectionTries = 0;
      this.logger.log(`Socket connected to address: ${this.url}`);
      if (this.onOpenCallback) this.onOpenCallback();
      this.startKeepAliveInterval();
      this.sendQueuedMessages();
    };

    this.ws.onclose = (event) => {
      this.logger.log(
        `Socket is closed. Reconnect will be attempted immediately. ${event.reason}`
      );

      this.stopKeepAliveInterval();
      setTimeout(() => {
        this.connect();
      }, 1000);
    };

    this.ws.onerror = (err) => {
      this.logger.log(`Socket encountered error: ${JSON.stringify(err)}`);
      this.ws?.close();
    };

    this.ws.onmessage = async (event) => {
      const socketAction = JSON.parse(event.data) as SocketAction;
      if (socketAction.action === 'link') {
        const socketId = socketAction.data?.socketId || '';
        Global.socketId = socketId;
        if (this.onLinkCallback) this.onLinkCallback(socketId);
      } else if (
        socketAction.action === 'end_conversation' &&
        !socketAction.data?.isTransfer
      ) {
        if (this.onEndConversationCallback)
          await this.onEndConversationCallback();
      }

      if (socketAction.action === 'message' && this.onMessageCallback) {
        this.onMessageCallback(socketAction.data as unknown as Message);
      }
    };
  }

  public disconnect() {
    this.stopKeepAliveInterval();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  public isConnected(): boolean {
    return !!this.ws && this.ws.readyState === WebSocket.OPEN;
  }

  public sendMessage(action: SocketAction) {
    if (this.isConnected()) {
      this.ws?.send(JSON.stringify(action));
    } else {
      this.enqueueMessage(action);
    }
  }

  public onMessage(callback: OnMessageCallback) {
    this.onMessageCallback = callback;
  }

  public onOpen(callback: OnOpenCallback) {
    this.onOpenCallback = callback;
  }

  public onEndConversation(callback: OnEndConversationCallback) {
    this.onEndConversationCallback = callback;
  }

  public onLink(callback: OnLinkCallback) {
    this.onLinkCallback = callback;
  }

  private startKeepAliveInterval() {
    this.keepAliveInterval = setInterval(() => {
      if (this.isConnected()) {
        this.sendMessage({
          action: 'keep_alive',
        });
      }
    }, 9 * 60 * 1000); // 9 minutes
  }

  private stopKeepAliveInterval() {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }

  private enqueueMessage(action: SocketAction) {
    this.messageQueue.push(action);
  }

  private sendQueuedMessages() {
    for (const message of this.messageQueue) {
      this.sendMessage(message);
    }
    this.clearMessageQueue();
  }

  private clearMessageQueue() {
    this.messageQueue = [];
  }
}
