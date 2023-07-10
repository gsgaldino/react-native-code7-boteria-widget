export interface HttpConnection {
  post(url: string, body?: any): Promise<any>;
  get(url: string): Promise<any>;
}
