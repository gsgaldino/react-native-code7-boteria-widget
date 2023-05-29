import React, { memo } from 'react';
import { View, Image as ExpoImage } from 'react-native';
import type { Message } from '../../../../../../types/message';
import { styles } from './styles';

const Image: React.FC<Message> = (msg) => {
  const imageUri = (msg.image ? msg.image : msg.message) as string;

  return (
    <View>
      {imageUri && (
        <ExpoImage
          style={styles.image}
          source={{
            uri: imageUri,
          }}
        />
      )}
    </View>
  );
};

export default memo(Image);
