import type { Notification } from '../ports';
import { NativeModules, AppState, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-code7-boteria-widget' doesn't seem to be linked. Make sure: \n\n` +
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
  postLocal(msg: string): void {
    AppState.currentState !== 'active' &&
      NotificationModule.sendNotification('Nova mensagem', msg);
  }
}
