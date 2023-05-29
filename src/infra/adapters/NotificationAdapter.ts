import type { Notification } from '../ports';
import {
  Notification as NotificationType,
  Notifications,
} from 'react-native-notifications';

export class NotificationAdapter implements Notification {
  postLocal(msg: string): void {
    const soundPath = '../notification_receiving.mp3';
    const notification = {
      body: msg,
      sound: soundPath,
    } as NotificationType;

    Notifications.postLocalNotification(notification);
  }
}
