import React, { createContext, useContext, useState, useCallback } from 'react';
import { IBotConfigs, IChatConfigurations } from '../types';
import { createService } from '../services';
import { logger } from '../utils';
import { Global } from '../global';

interface IChannel {
  channelId: string;
  settings: {
    botFab: string;
    mainTextColor: string;
    mainColor: string;
    secondaryColor: string;
    secondaryTextColor: string;
  };
}

const defaultBotConfig: IBotConfigs = {
  title: 'Bot title',
  botFab: '',
  colors: {
    main: '#254EDB',
    mainText: '#FFFFFF',
    secondary: '#DADCE3',
    secondaryText: '#5A5D68',
  },
  poweredBy: 'Powered By Code7 Boteria',
  poweredByUrl: 'https://code7.com/produtos/boteria',
};

const ChatConfigurationsContext = createContext<IChatConfigurations>({
  isChatOpen: false,
  toggleIsChatOpen: () => {},
  setBotConfigs: () => {},
  botConfigs: defaultBotConfig,
  fetchBotAndUpdateConfigs: async () => {},
});

interface IChatConfigurationsProps {
  appearance?: IBotConfigs;
  apiUrl: string;
}

const IsChatOpenProvider: React.FC<IChatConfigurationsProps> = ({
  children,
  appearance,
  apiUrl,
}) => {
  const getBotService = createService(apiUrl);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [configs, setConfigs] = useState<IBotConfigs>(defaultBotConfig);

  const toggleIsChatOpen = useCallback(() => {
    setIsChatOpen((oldValue) => !oldValue);
  }, [isChatOpen, setIsChatOpen]);

  const setBotConfigs = useCallback((cfg: IBotConfigs) => setConfigs(cfg), []);

  const fetchBotAndUpdateConfigs = useCallback(async () => {
    try {
      const { data } = await getBotService.get(Global.botId);

      const [webchatChannel] = data?.channels?.filter((ch: IChannel) => {
        return ch.channelId === 'WebChat';
      });

      const botConfigs: IBotConfigs = {
        title: data?.title,
        poweredBy: webchatChannel?.poweredBy,
        poweredByUrl: webchatChannel?.poweredByUrl,
        botFab: String(webchatChannel?.settings?.botFab),
        colors: {
          main: String(webchatChannel?.settings?.mainColor),
          secondary: String(webchatChannel?.settings?.secondaryColor),
          mainText: String(webchatChannel?.settings?.mainTextColor),
          secondaryText: String(webchatChannel?.settings?.secondaryTextColor),
        },
      };

      setBotConfigs({
        ...botConfigs,
        ...appearance,
        colors: {
          ...botConfigs.colors,
          ...appearance?.colors,
        },
      });
    } catch (error) {
      logger.log(`Error getting bot styles: ${JSON.stringify(error)}`);
      setBotConfigs({
        ...defaultBotConfig,
        ...appearance,
        colors: {
          ...defaultBotConfig.colors,
          ...appearance?.colors,
        },
      });
    }
  }, []);

  const chatConfigurationsState: IChatConfigurations = {
    isChatOpen,
    toggleIsChatOpen,
    setBotConfigs,
    botConfigs: configs,
    fetchBotAndUpdateConfigs,
  };

  return (
    <ChatConfigurationsContext.Provider value={chatConfigurationsState}>
      {children}
    </ChatConfigurationsContext.Provider>
  );
};

export default IsChatOpenProvider;

export const useChatConfigurations = () =>
  useContext(ChatConfigurationsContext) as IChatConfigurations;
