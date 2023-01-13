import React, { useRef, memo } from 'react';
import {
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Message } from '../../../../types/Message';

import { useSocketContext } from '../../../../context/Socket/Component';
import MessageComponent from './components/MessageComponent';

import { styles } from './styles';

interface IRenderItemProps {
  item: Message;
}

const MessageList: React.FC = () => {
  const flatlistRef = useRef<null | FlatList>(null);
  const { messages } = useSocketContext();

  const renderItem = ({ item }: IRenderItemProps) => {
    return <MessageComponent message={item} />;
  };

  const scrollBottom = (): void => {
    flatlistRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.messagesContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          ref={flatlistRef}
          data={messages}
          onContentSizeChange={scrollBottom}
          onLayout={scrollBottom}
          renderItem={renderItem}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default memo(MessageList);
