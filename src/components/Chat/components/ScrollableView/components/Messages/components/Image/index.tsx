import React from 'react';
import { View, Image as ExpoImage } from 'react-native';
import { Message } from '../../../../../../../../types/Message';
import { styles } from './styles';

const Image: React.FC<Message> = (msg) => {
  const imageUri = (msg.image ? msg.image : msg.message) as string;

  return (
    <View>
      <ExpoImage
        style={styles.image}
        source={{
          uri: imageUri,
        }}
      />
    </View>
  );
};

export default Image;
