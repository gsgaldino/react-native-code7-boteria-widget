import axios from 'axios';
import type { AxiosInstance } from 'axios';

export const createService = (url: string): AxiosInstance => {
  return axios.create({ baseURL: url });
};
