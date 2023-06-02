import type {
  ChatConfigurationsType,
  ChatConfigurationsApiResponse,
} from '../types';

export interface ChatConfigurationsGateway {
  getStyles(
    botId: string,
    appearance?: ChatConfigurationsType
  ): Promise<ChatConfigurationsType>;
  _treatStyles(
    channels: ChatConfigurationsApiResponse,
    appearance: ChatConfigurationsType
  ): ChatConfigurationsType;
}
