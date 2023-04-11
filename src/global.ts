import { IAppProps, IEnvironment } from './types';

type GlobalParams = {
  env: IEnvironment | null;
  socketId: string | null;
} & Pick<IAppProps, 'botId' | 'params'>;

export const Global: GlobalParams = {
  botId: '',
  params: undefined,
  env: null,
  socketId: null,
};
