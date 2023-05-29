import React from 'react';
import { Provider } from './Provider';

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
