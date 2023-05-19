export interface NotificationGateway {
  postLocal(msg: string): void;
}
