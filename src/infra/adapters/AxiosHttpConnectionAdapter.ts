import axios from 'axios';
import { HttpConnection, Logger } from '../ports';

export class AxiosHttpConnectionAdapter implements HttpConnection {
  constructor(
    private readonly baseUrl: string,
    private readonly logger: Logger
  ) {}

  async get(url: string): Promise<any> {
    try {
      const requestUrl = this.baseUrl + url;
      const response = await axios.get(requestUrl);
      return response.data;
    } catch (error: any) {
      this.logger.log(
        'AxiosHttpConnectionAdapter.get encontered a error',
        `MESSAGE: ${error?.response?.data?.error}`,
        JSON.stringify(error)
      );
      return null;
    }
  }

  async post(url: string, body?: any): Promise<any> {
    try {
      const requestUrl = this.baseUrl + url;
      const response = await axios.post(requestUrl, body);
      return response.data;
    } catch (error: any) {
      this.logger.log(
        `AxiosHttpConnectionAdapter.post encontered a error`,
        `MESSAGE: ${error?.response?.data?.error}`,
        JSON.stringify(error)
      );
    }
  }
}
