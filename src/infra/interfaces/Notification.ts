export interface Notification {
  postLocal(title: string, msg: string, filePath?: string): void;
}
