import type { SocketPayload } from '../types';
import { Observable } from './Observable';

export class Session extends Observable {
  public current: string = '';

  constructor(initialData?: string) {
    super();
    if (initialData) this.current = initialData;
  }

  public changeSession(newSession: string) {
    this.current = newSession;
  }

  public clearSession() {
    this.current = '';
    this.notify('clearSession', null);
  }

  public sendAction(action: SocketPayload) {
    this.notify('sendAction', action);
  }
}
