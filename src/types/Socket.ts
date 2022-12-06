import { Message } from './Message';

export interface ISocketContextState {
  handleSubmitMessage: Function;
  messages: Message[];
  handleCarouselButtonClick: (clickInfo: any) => void;
}
