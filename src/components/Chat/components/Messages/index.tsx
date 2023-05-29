import React, { useRef } from 'react';
import { FlatList, View } from 'react-native';

import MessageComponent from './components/MessageComponent';
import type { Message } from '../../../../types';
import type { ChatConfigurations } from '../../../../entities';
import { styles } from './styles';

interface IRenderItemProps {
  item: any;
}

export interface IMessageListProps
  extends Pick<ChatConfigurations, 'settings'> {
  data: Message[];
}

export const MessageList = ({ data, settings }: IMessageListProps) => {
  const list = typeof data === 'string' ? [] : data;
  const flatlistRef = useRef<null | FlatList>(null);
  const renderItem = ({ item }: IRenderItemProps) => {
    return <MessageComponent settings={settings} message={item} />;
  };

  const scrollBottom = (): void => {
    if (data.length) flatlistRef.current?.scrollToEnd?.();
  };

  return (
    <View style={styles.messagesContainer}>
      <FlatList
        ref={flatlistRef}
        data={list}
        onContentSizeChange={scrollBottom}
        onLayout={scrollBottom}
        renderItem={renderItem}
        keyExtractor={(msg: any) => msg?.id || 'yo'}
      />
    </View>
  );
};
