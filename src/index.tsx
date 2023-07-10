import type { PropsWithChildren } from 'react';
import React from 'react';
import { Provider } from './Provider';

export type ICode7BoteriaProps = PropsWithChildren<{
  botId: string;
  staging?: boolean;
  dev?: boolean;
  appearance?: {
    title?: string;
    settings: {
      botFab: string;
      mainColor: string;
      mainTextColor: string;
      secondaryColor: string;
      secondaryTextColor: string;
    };
  };
  params?: object;
}>;

export function Code7Boteria(props: ICode7BoteriaProps) {
  return <Provider {...props} />;
}
