export interface IBotConfigs {
  title: string;
  botFab: string;
  colors: {
    main: string;
    secondary: string;
    mainText: string;
    secondaryText: string;
  };
}

export interface IChatConfigurations {
  isChatOpen: boolean;
  toggleIsChatOpen(): void;
  botConfigs: IBotConfigs;
  setBotConfigs: Function;
}
