import { environments } from '../constants';
import { IEnvironment } from '../types';

export const getEnvironment = (staging: boolean): IEnvironment => {
  if (staging) return environments.staging;
  if (process.env.NODE_ENV === 'development') return environments.development;

  return environments.production;
};
