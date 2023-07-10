import React, { memo } from 'react';
import { View, Image as ExpoImage, TouchableOpacity } from 'react-native';
import type { IMessageComponentProps } from '../MessageComponent';

import { styles } from './styles';

const Image: React.FC<IMessageComponentProps> = (props) => {
  const imageUri = (
    props.message.image ? props.message.image : props.message.message
  ) as string;

  return (
    <TouchableOpacity onPress={() => props.handlOpenModalImage(imageUri)}>
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
    </TouchableOpacity>
  );
};

export default memo(Image);
