import { Notifications, Notification } from 'react-native-notifications';

interface ISendNotificationProps {
  body: string;
}

export const sendNotification = ({ body }: ISendNotificationProps) => {
  Notifications.postLocalNotification({
    body,
    // sound: 'download.aiff',
  } as Notification);
};
