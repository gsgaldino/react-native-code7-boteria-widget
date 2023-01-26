import { Notifications, Notification } from 'react-native-notifications';

interface ISendNotificationProps {
  body: string;
}

export const sendNotification = ({ body }: ISendNotificationProps) => {
  const soundPath = '../notification_receiving.mp3';

  Notifications.postLocalNotification({
    body,
    sound: soundPath,
    badge: 1,
  } as Notification);
};
