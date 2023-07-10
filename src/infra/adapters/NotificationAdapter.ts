import type { Notification } from '../interfaces';
import { NativeModules, Platform, AppState } from 'react-native';

const LINKING_ERROR =
  `The package 'code7-boteria-lib-mobile-rn' doesn't seem to be linked. Make sure: \n\n` +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n' +
  Platform.select({
    ios: "- If you are running this app on IOS unfortunaly we do not have support for Notifications on IOS yet'\n",
    default: '',
  });

const NotificationModule = NativeModules.NotificationModule
  ? NativeModules.NotificationModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export class NotificationAdapter implements Notification {
  postLocal(title: string, msg: string, filePath?: string): void {
    if (filePath) NotificationModule.sendNotification(title, msg, filePath);
    else if (!filePath && AppState.currentState !== 'active') {
      NotificationModule.sendNotification(title, msg, '');
    }
  }
}
