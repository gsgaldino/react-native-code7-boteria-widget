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

export enum CarouselDestinationTypes {
  URL = 'url',
  PHONE = 'phone',
}

export type Document = {
  /**
   * URL para o documento armazenado no storage da boteria
   */
  fileUrl: string;

  /**
   * Título do documento configurado pelo cliente no fluxo do BOT
   */
  title?: string;

  /**
   * Tamanho do documento em KB
   */
  size?: number;
};

export type MessageStatus = 'read' | 'delivered';

export interface Message {
  id?: string;

  status?: MessageStatus;
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
  isMedia?: boolean;

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
  video?: Document;

  /**
   * Essa opção é retornada quando o tipo === AUDIO
   */
  audio?: Document;

  /**
   * Essa opção é retornada quando o tipo === DOCUMENT
   */
  document?: Document;

  /**
   * Objeto com as informações as respeito do Carrossel
   * É retornado quando o tipo === CAROUSEL
   */
  carousel?: Carousel;

  /**
   * Hora na qual a mensagem foi foi recebida ou enviada
   * String formadata no padrão HH:MM
   */
  hour?: string;

  /**
   * URI para o arquivo localizado no aparelho do cliente
   */
  localFileUri?: string;
}

export interface Carousel {
  /**
   * Array com os cards do carrossel
   */
  cards?: Card[];
}

export type Card = {
  _id: string;

  /**
   * URL para a imagem do card
   */
  imageUrl: string;

  /**
   * Array com os botões configurados na Boteria
   */
  buttons: Button[];

  /**
   * Título do card
   */
  title: string;

  /**
   * Descrição do card
   */
  description: string;
};

export type Button = {
  _id: string;

  /**
   * Texto de título do botão
   */
  label: string;

  /**
   * Objeto com o destino do botão
   */
  destination?: {
    /**
     * Indica qual o tipo de destino
     */
    type?: CarouselDestinationTypes;

    /**
     * Valor do destino do botão
     */
    value?: string;
  };
};
