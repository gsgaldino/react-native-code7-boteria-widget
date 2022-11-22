export interface Message {
  from: string;
  message: string;
  type: string;
  ext?: string;
}

export enum MessageTypes {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
  COLLECT = 'Collect',
  TYPING = 'TYPING',
  MESSAGE = 'MESSAGE',
  CAROUSEL = 'CAROUSEL',
}
