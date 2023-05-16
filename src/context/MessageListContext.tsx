import type { PropsWithChildren } from 'react';
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';

import { MessageList } from '../entities/MessageList';

type MessageListType = MessageList;
type MessageListContextType = {
  messageList: MessageListType;
  updateState: () => void;
};

const MessageListContext = createContext<MessageListContextType>({
  messageList: new MessageList([]),
  updateState: () => {},
});

export const useMessageList = (): MessageListContextType =>
  useContext(MessageListContext);

type MessageListProviderProps = PropsWithChildren<{
  initialMessageList: MessageList;
}>;

export default function MessageListProvider({
  children,
  initialMessageList,
}: MessageListProviderProps) {
  const isFirstRender = useRef(true);

  const [messageList, setMessageList] =
    useState<MessageList>(initialMessageList);

  const updateState = () => {
    setMessageList(
      (prevMessageList) => new MessageList([...prevMessageList?.messages])
    );
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setMessageList(initialMessageList);
  }, [isFirstRender.current]);

  return (
    <MessageListContext.Provider value={{ messageList, updateState }}>
      {children}
    </MessageListContext.Provider>
  );
}
