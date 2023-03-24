import React, { useRef, memo } from 'react';
import { FlatList, View } from 'react-native';
import { Message } from '../../../../types/message';
import { generateUniqueId } from '../../../../utils';

import { useStorage } from '../../../../context/Storage/Component';
import MessageComponent from './components/MessageComponent';

import { styles } from './styles';

interface IRenderItemProps {
  item: Message;
}

const MessageList: React.FC = () => {
  const flatlistRef = useRef<null | FlatList>(null);
  const { messages } = useStorage();

  const renderItem = ({ item }: IRenderItemProps) => {
    return <MessageComponent message={item} />;
  };

  const scrollBottom = (): void => {
    if (messages.length) flatlistRef.current?.scrollToEnd?.();
  };

  return (
    <View style={styles.messagesContainer}>
      <FlatList
        ref={flatlistRef}
        data={messages}
        onContentSizeChange={scrollBottom}
        onLayout={scrollBottom}
        renderItem={renderItem}
        keyExtractor={() => generateUniqueId()}
      />
    </View>
  );
};

export default memo(MessageList);
