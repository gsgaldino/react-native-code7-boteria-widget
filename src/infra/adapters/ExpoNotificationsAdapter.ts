import * as Notifications from 'expo-notifications';
import type { Notification } from '../ports';

export class ExpoNotificationsAdapter implements Notification {
  constructor() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }

  postLocal(msg: string): void {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'New message',
        body: msg,
      },
      trigger: null,
    });
  }
}
