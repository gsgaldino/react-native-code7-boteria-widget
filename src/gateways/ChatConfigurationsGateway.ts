import {
  ChatConfigurationsType,
  ChatConfigurationsApiResponse,
} from '../types';

export interface ChatConfigurationsGateway {
  getStyles(botId: string): Promise<ChatConfigurationsType>;
  _treatStyles(channels: ChatConfigurationsApiResponse): ChatConfigurationsType;
}
