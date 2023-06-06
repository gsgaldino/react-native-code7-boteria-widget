import type { ChatConfigurationsType } from '../entities/ChatConfigurations';

export const initialConfigs: ChatConfigurationsType = {
  settings: {
    mainColor: '#254EDB',
    mainTextColor: '#FFFFFF',
    secondaryColor: '#DADCE3',
    secondaryTextColor: '#5A5D68',
    botFab:
      'data:image/png;base64,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',
  },
  title: 'Bot title',
  poweredBy: 'Powered By Code7 Boteria',
  poweredByUrl: 'https://code7.com/produtos/boteria',
};
