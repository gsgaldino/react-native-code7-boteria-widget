import React, { useRef } from 'react';
import { FlatList, View } from 'react-native';
import { Message } from '../../../../types/message';

import MessageComponent from './components/MessageComponent';
import { useMessageList } from '../../../../context/MessageListContext';

import { styles } from './styles';

interface IRenderItemProps {
  item: Message;
}

const MessageList = () => {
  const { messageList } = useMessageList();

  const flatlistRef = useRef<null | FlatList>(null);
  const renderItem = ({ item }: IRenderItemProps) => {
    return <MessageComponent message={item} />;
  };

  const scrollBottom = (): void => {
    if (messageList?.messages?.length) flatlistRef.current?.scrollToEnd?.();
  };

  return (
    <View style={styles.messagesContainer}>
      <FlatList
        ref={flatlistRef}
        data={messageList?.messages}
        onContentSizeChange={scrollBottom}
        onLayout={scrollBottom}
        renderItem={renderItem}
        keyExtractor={(msg: Message) => msg.id}
      />
    </View>
  );
};

export default MessageList;
