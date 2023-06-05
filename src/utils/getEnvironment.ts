import { environments } from '../constants';
import type { IEnvironment } from '../types';

export const getEnvironment = (staging: boolean): IEnvironment => {
  if (staging) return environments.staging;
  console.log('ENVIRONMENT', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') return environments.development;

  return environments.production;
};
