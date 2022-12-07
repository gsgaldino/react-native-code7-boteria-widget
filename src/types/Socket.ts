import { Button, Card, Message } from './Message';

export interface IHandleCarouselButtonClickProps {
  clickedButton: Button;
  clickedCard: Card;
}

export interface ISocketContextState {
  handleSubmitMessage: Function;
  messages: Message[];
  handleCarouselButtonClick: (
    clickInfo: IHandleCarouselButtonClickProps
  ) => void;
}
