import React, { createContext, useContext, useState, useCallback } from 'react';
import { IBotConfigs, IChatConfigurations } from '../types/ChatConfigurations';
import getBot from '../services/getBot';

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
};

const ChatConfigurationsContext = createContext<IChatConfigurations>({
  isChatOpen: false,
  toggleIsChatOpen: () => {},
  setBotConfigs: () => {},
  botConfigs: defaultBotConfig,
  fetchBotAndUpdateConfigs: async () => {},
});

const IsChatOpenProvider: React.FC<React.ReactNode> = (props) => {
  const { children } = props;

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [configs, setConfigs] = useState<IBotConfigs>(defaultBotConfig);

  const toggleIsChatOpen = useCallback(
    () => setIsChatOpen(!isChatOpen),
    [isChatOpen]
  );

  const setBotConfigs = (cfg: IBotConfigs) => setConfigs(cfg);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchBotAndUpdateConfigs = async (botId: string) => {
    const { data } = await getBot.get('62e9145fc073550012d52f25');

    console.log('botId', botId);
    const [webchatChannel] = data?.channels?.filter((ch: IChannel) => {
      return ch.channelId === 'WebChat';
    });

    const botConfigs: IBotConfigs = {
      title: data?.title,
      botFab: String(webchatChannel?.settings?.botFab),
      colors: {
        main: String(webchatChannel?.settings?.mainColor),
        secondary: String(webchatChannel?.settings?.secondaryColor),
        mainText: String(webchatChannel?.settings?.mainTextColor),
        secondaryText: String(webchatChannel?.settings?.secondaryTextColor),
      },
    };

    setBotConfigs(botConfigs);
  };

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
