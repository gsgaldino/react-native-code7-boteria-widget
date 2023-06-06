import { environments } from '../constants';
import type { IEnvironment } from '../types';

export interface IGetEnvironmentProps {
  staging?: boolean;
  dev?: boolean;
}

export const getEnvironment = ({
  staging,
  dev,
}: IGetEnvironmentProps): IEnvironment => {
  if (staging) return environments.staging;
  else if (dev) return environments.development;
  return environments.production;
};
