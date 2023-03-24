import type { PropsWithChildren } from 'react';
import { IBotConfigs } from './chatConfigurations';

export type IAppProps = PropsWithChildren<{
  botId: string;
  params?: object;
  appearance?: IBotConfigs;
  staging?: boolean;
}>;
