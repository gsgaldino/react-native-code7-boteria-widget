import { ChatConfigurationsType } from '../entities/ChatConfigurations';
import { ChatConfigurationsGateway } from './ChatConfigurationsGateway';
import { HttpConnection } from '../infra';
import { channel } from '../constants/channel';
import { initialConfigs } from '../constants/initialChatConfigurations';
import { ChatConfigurationsApiResponse } from '../types';

export class ChatConfigurationsHttpGateway
  implements ChatConfigurationsGateway
{
  constructor(readonly httpAdapter: HttpConnection) {}

  _treatStyles(
    apiResponse: ChatConfigurationsApiResponse
  ): ChatConfigurationsType {
    const [activeChannel] = apiResponse.channels.filter(
      (ch: any) => ch?.channelId?.toLowerCase?.() === channel
    );

    if (activeChannel) {
      return {
        title: activeChannel.settings.headerName || initialConfigs.title,
        poweredBy: activeChannel.poweredBy || initialConfigs.poweredBy,
        poweredByUrl: activeChannel.poweredByUrl || initialConfigs.poweredByUrl,
        settings: {
          botFab:
            activeChannel.settings.botFab || initialConfigs.settings.botFab,
          mainColor:
            activeChannel.settings.mainColor ||
            initialConfigs.settings.mainColor,
          secondaryColor:
            activeChannel.settings.secondaryColor ||
            initialConfigs.settings.secondaryColor,
          mainTextColor:
            activeChannel.settings.mainTextColor ||
            initialConfigs.settings.mainTextColor,
          secondaryTextColor:
            activeChannel.settings.secondaryTextColor ||
            initialConfigs.settings.secondaryTextColor,
        },
      };
    } else {
      return initialConfigs;
    }
  }

  public async getStyles(botId: string): Promise<ChatConfigurationsType> {
    const styles = await this.httpAdapter.get(`/${botId}`);

    if (styles) {
      return this._treatStyles(styles);
    }

    return initialConfigs;
  }
}
