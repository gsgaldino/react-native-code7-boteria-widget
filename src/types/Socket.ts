import { Button, Card, MessageTypes } from '.';

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
  disconnect: () => void;
}

export type SocketData = {
  botId: string;
  isPreview: boolean;
  botChannel: string;
  id: string;
  sessionId: string | null;
  socketId: string;
};

export type SocketAction = {
  action: 'message' | 'link';
  data: Partial<SocketData>;
};

export type SocketPayload = {
  type: MessageTypes;
  data: object;
};
