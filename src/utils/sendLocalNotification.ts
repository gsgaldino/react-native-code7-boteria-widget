import { Notifications, Notification } from 'react-native-notifications';
import { Message, MessageTypes } from '../types/message';

export const sendNotification = (msg: Message) => {
  const soundPath = '../notification_receiving.mp3';

  const hasToNotify = msg.type !== MessageTypes.TYPING;

  hasToNotify &&
    Notifications.postLocalNotification({
      body: msg.message,
      sound: soundPath,
    } as Notification);
};
