import { Button, Card, Message } from './Message';

export interface IHandleCarouselButtonClickProps {
  /**
   * Botão que foi clicado pelo usuário
   */
  clickedButton: Button;

  /**
   * Card onde o botão clicado está contido
   */
  clickedCard: Card;
}

export interface ISocketContextState {
  /**
   * Função responsável por capturar uma mensagem enviada pelo
   * usuário e fazer o emit para o socket
   */
  handleSubmitMessage: Function;

  /**
   * Array com as mensagens pertencentes a conversa atual
   */
  messages: Message[];

  /**
   * Função responsável por direcionar o usuário ao destino
   * do botão no carrossel
   */
  handleCarouselButtonClick: (
    clickInfo: IHandleCarouselButtonClickProps
  ) => void;

  restartConversation: () => Promise<void>;
}
