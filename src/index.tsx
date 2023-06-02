import React from 'react';
import { Provider } from './Provider';
import type { ChatConfigurationsType } from './entities/ChatConfigurations';

export interface ICode7BoteriaProps {
  botId: string;
  staging?: boolean;
  appearance?: ChatConfigurationsType;
  params?: object;
}

export function Code7Boteria(props: ICode7BoteriaProps) {
  return <Provider {...props} />;
}
