import { environments } from '../constants';
import { IEnvironment } from '../types';

export const getEnvironment = (staging: boolean): IEnvironment => {
  if (staging) return environments.staging;
  if (process.env.NODE_ENV === 'production') return environments.production;

  return environments.development;
};
