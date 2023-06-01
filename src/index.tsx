import React from 'react';
// import { NativeModules, Platform } from 'react-native';
import { Provider } from './Provider';

// const LINKING_ERROR =
//   `The package 'code7-boteria-lib-mobile-rn' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo Go\n';

// const Code7BoteriaLibMobileRn = NativeModules.Code7BoteriaLibMobileRn
//   ? NativeModules.Code7BoteriaLibMobileRn
//   : new Proxy(
//       {},
//       {
//         get() {
//           throw new Error(LINKING_ERROR);
//         },
//       }
//     );

// export function multiply(a: number, b: number): Promise<number> {
//   return Code7BoteriaLibMobileRn.multiply(a, b);
// }

export interface ICode7BoteriaProps {
  botId: string;
  staging?: boolean;
  appearance?: any;
  params?: object;
  isExpoApp?: boolean;
}

export function Code7Boteria(props: ICode7BoteriaProps) {
  return <Provider {...props} />;
}
