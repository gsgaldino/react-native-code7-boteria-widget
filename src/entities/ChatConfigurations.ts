type Settings = {
  botFab?: string;
  mainColor?: string;
  secondaryColor?: string;
  mainTextColor?: string;
  secondaryTextColor?: string;
  headerName?: string;
};

export class ChatConfigurations {
  constructor(
    public readonly title: string = '',
    public readonly poweredBy: string = '',
    public readonly poweredByUrl: string = '',
    public readonly settings: Settings = {},
    public isOpen?: boolean
  ) {
    if (!isOpen) this.isOpen = false;
  }

  public toggleIsOpen = (): void => {
    this.isOpen = !this.isOpen;
  };

  public open = (): void => {
    this.isOpen = true;
  };

  public close = (): void => {
    this.isOpen = false;
  };
}

type ChatConfigurationsTypeWithFunctions = ReturnType<() => ChatConfigurations>;

export type ChatConfigurationsType = Omit<
  ChatConfigurationsTypeWithFunctions,
  'open' | 'close' | 'toggleIsOpen'
>;
