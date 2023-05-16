import { ChatConfigurationsType } from '../entities/ChatConfigurations';

export { ChatConfigurationsType };

interface ChannelApiResponse extends ChatConfigurationsType {
  channelId: string;
}

export interface ChatConfigurationsApiResponse {
  channels: ChannelApiResponse[];
}
