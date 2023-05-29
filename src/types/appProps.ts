import type { PropsWithChildren } from 'react';
import type { ChatConfigurationsType } from './chatConfigurations';

export type IAppProps = PropsWithChildren<{
  botId: string;
  params?: object;
  appearance?: ChatConfigurationsType;
  staging?: boolean;
}>;
