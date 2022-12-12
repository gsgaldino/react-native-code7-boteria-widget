import React, { createContext, useContext, useState, useCallback } from 'react';
import { IBotConfigs, IChatConfigurations } from 'src/types/ChatConfigurations';

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
});

const IsChatOpenProvider: React.FC<React.ReactNode> = (props) => {
  const { children } = props;

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [configs, setConfigs] = useState<IBotConfigs>(defaultBotConfig);

  const toggleIsChatOpen = useCallback(
    () => setIsChatOpen(!isChatOpen),
    [isChatOpen]
  );

  const setBotConfigs = (cfg: IBotConfigs) => setConfigs(cfg as IBotConfigs);

  const chatConfigurationsState: IChatConfigurations = {
    isChatOpen,
    toggleIsChatOpen,
    setBotConfigs,
    botConfigs: configs,
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
