import type { ChatConfigurationsType } from '../entities/ChatConfigurations';
import type { ChatConfigurationsGateway } from './ChatConfigurationsGateway';
import type { HttpConnection } from '../infra';
import { channel } from '../constants/channel';
import { initialConfigs } from '../constants/initialChatConfigurations';
import type { ChatConfigurationsApiResponse } from '../types';

export class ChatConfigurationsHttpGateway
  implements ChatConfigurationsGateway
{
  constructor(readonly httpAdapter: HttpConnection) {}

  _treatStyles(
    apiResponse: ChatConfigurationsApiResponse,
    appearance?: ChatConfigurationsType
  ): ChatConfigurationsType {
    const [activeChannel] = apiResponse.channels.filter(
      (ch: any) => ch?.channelId?.toLowerCase?.() === channel
    );

    if (activeChannel) {
      return {
        title:
          appearance?.title ||
          activeChannel?.settings?.headerName ||
          initialConfigs.title,
        poweredBy: activeChannel.poweredBy,
        poweredByUrl: activeChannel.poweredByUrl,
        settings: {
          botFab:
            appearance?.settings?.botFab ||
            activeChannel?.settings?.botFab ||
            initialConfigs?.settings?.botFab,
          mainColor:
            appearance?.settings?.mainColor ||
            activeChannel?.settings?.mainColor ||
            initialConfigs?.settings?.mainColor,
          secondaryColor:
            appearance?.settings?.secondaryColor ||
            activeChannel?.settings?.secondaryColor ||
            initialConfigs?.settings?.secondaryColor,
          mainTextColor:
            appearance?.settings?.mainTextColor ||
            activeChannel?.settings?.mainTextColor ||
            initialConfigs?.settings?.mainTextColor,
          secondaryTextColor:
            appearance?.settings?.secondaryTextColor ||
            activeChannel?.settings?.secondaryTextColor ||
            initialConfigs?.settings?.secondaryTextColor,
        },
      };
    } else {
      return initialConfigs;
    }
  }

  public async getStyles(
    botId: string,
    appearance?: ChatConfigurationsType
  ): Promise<ChatConfigurationsType> {
    const styles = await this.httpAdapter.get(`/${botId}`);

    if (styles) {
      return this._treatStyles(styles, appearance);
    }

    return initialConfigs;
  }
}
