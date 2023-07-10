export interface NotificationGateway {
  postLocal(title: string, msg: string, filePath?: string): void;
}
