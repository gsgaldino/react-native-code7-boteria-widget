import type { NotificationGateway } from './NotificationGateway';
import type { Notification as INotification } from '../infra';

export class NotificationRnGateway implements NotificationGateway {
  constructor(private readonly notificationAdapter: INotification) {}

  public postLocal(msg: string): void {
    this.notificationAdapter.postLocal(msg);
  }
}
