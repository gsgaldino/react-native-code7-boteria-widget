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
    public readonly title?: string,
    public readonly poweredBy?: string,
    public readonly poweredByUrl?: string,
    public readonly settings?: Settings,
    public isOpen?: boolean
  ) {
    if (!isOpen) this.isOpen = false;
  }

  private canOpen = (): boolean => {
    return Object.keys(this.settings || {}).length > 0;
  };

  public toggleIsOpen = (): void => {
    this.isOpen ? this.close() : this.open();
  };

  public open = (): void => {
    this.isOpen = this.canOpen() && true;
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
