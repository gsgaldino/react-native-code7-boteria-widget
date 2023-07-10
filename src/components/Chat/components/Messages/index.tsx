import React, { useRef, memo, useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';

import MessageComponent from './components/MessageComponent';
import ImageModal from './components/ImageModal';
import type { Message } from '../../../../types';
import type { ChatConfigurations } from '../../../../entities';
import { styles } from './styles';

interface IRenderItemProps {
  item: any;
}

export interface IMessageListProps
  extends Pick<ChatConfigurations, 'settings'> {
  data: Message[];
  sendNotification: (title: string, message: string, filePath?: string) => void;
}

const MessageList = ({
  data,
  settings,
  sendNotification,
}: IMessageListProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const list = typeof data === 'string' ? [] : data;
  const flatlistRef = useRef<null | FlatList>(null);

  const renderItem = useCallback(({ item }: IRenderItemProps) => {
    return (
      <MessageComponent
        sendNotification={sendNotification}
        settings={settings}
        message={item}
        handlOpenModalImage={handlOpenModalImage}
      />
    );
  }, []);

  const scrollBottom = useCallback(() => {
    if (data.length) flatlistRef.current?.scrollToEnd?.({ animated: true });
  }, [data]);

  const keyExtractor = useCallback((msg: Message) => msg.id || 'yo', []);

  const handlOpenModalImage = (param: string) => {
    setImageUri(param);
    setModalIsOpen(true);
  };

  return (
    <View style={styles.messagesContainer}>
      <FlatList
        ref={flatlistRef}
        data={list}
        onContentSizeChange={scrollBottom}
        onLayout={scrollBottom}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={list}
      />
      {modalIsOpen && (
        <ImageModal imageUri={imageUri} setModalIsOpen={setModalIsOpen} />
      )}
    </View>
  );
};

export default memo(MessageList);
