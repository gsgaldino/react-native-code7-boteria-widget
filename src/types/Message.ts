export enum MessageTypes {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
  COLLECT = 'Collect',
  TYPING = 'TYPING',
  MESSAGE = 'MESSAGE',
  CAROUSEL = 'CAROUSEL',
}

export enum From {
  USER = 'user',
  BOT = 'bot',
}

export interface Message {
  /**
   * Identifica se a mensagem está sendo enviada pelo BOT
   * ou pelo usuário
   */
  from: From;

  /**
   * O texto da mensagem
   * No caso de arquivos de mídia é enviado para o orquestrador
   * a URL do arquivo
   * TODO: remover null e undefined
   */
  message: string | null | undefined;

  /**
   * Identifica o tipo do arquivo que está sendo enviado
   * para o orquestrador
   */
  type: MessageTypes;

  /**
   * Extensão do arquivo ex: jpg | png | mp3 | docx
   */
  ext?: string;

  /**
   * Identifica se é um arquivo de mídia ou não
   */
  isMedia?: Boolean;

  /**
   * Descrição da foto configurada no fluxo do BOT
   */
  fileDescription?: string;

  /**
   * Título da foto
   * Este campo é preenchido no fluxo da boteria, nos blocos de imagem
   * e depois salvo no banco de dados
   */
  fileTitle?: string;

  /**
   * URL da imagem armazenada no storage da boteria
   */
  image?: string;

  /**
   * Essa opção é retornada quando o tipo === VIDEO
   */
  video?: {
    /**
     * URL para o vídeo armazenado no storage da boteria
     */
    fileUrl: string;

    /**
     * Título do video configurado pelo cliente no fluxo do BOT
     */
    title: string;
  };
}
