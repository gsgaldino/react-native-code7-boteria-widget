export interface IBotConfigs {
  /**
   * Título do BOT cadastrado na seção de Identidade
   * Usado no Header do componente de Chat
   */
  title: string;

  /**
   * URI para a imagem do BOT
   */
  botFab: string;

  /**
   * Objeto com as cores cadastradas na configuração do WebChat
   */
  colors: {
    /**
     * Cor primária do User
     */
    main: string;

    /**
     * Cor primária do BOT
     */
    secondary: string;

    /**
     * Cor do texto do User
     */
    mainText: string;

    /**
     * Cor do texto do Bot
     */
    secondaryText: string;
  };
}

export interface IChatConfigurations {
  /**
   * Booleano que identifica se o Chat está aberto ou não
   */
  isChatOpen: boolean;

  /**
   * Função que faz o toggle da propriedade isChatOpen
   */
  toggleIsChatOpen: () => void;

  /**
   * Objeto com as configurações do Bot
   */
  botConfigs: IBotConfigs;

  /**
   * Função que atualiza o estado com as configurações do Bot
   */
  setBotConfigs: (newConfigs: IBotConfigs) => void;
}
