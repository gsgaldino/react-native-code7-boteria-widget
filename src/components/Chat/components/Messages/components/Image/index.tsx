import React, { memo } from 'react';
import { View, Image as ExpoImage } from 'react-native';
import type { IMessageComponentProps } from '../MessageComponent';

import { styles } from './styles';

const Image: React.FC<IMessageComponentProps> = (msg) => {
  const imageUri = (
    msg.message.image ? msg.message.image : msg.message.message
  ) as string;

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
