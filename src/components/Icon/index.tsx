import React from 'react';
import { Image, ActivityIndicator, View } from 'react-native';

import widgetImage from '../../assets/widget.png';
import { styles } from './styles';

function Icon({ imageUrl }: { imageUrl?: string }) {
  const uri = imageUrl ? { uri: imageUrl } : widgetImage;

  return imageUrl ? (
    <Image source={uri} style={styles.image} />
  ) : (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

export default Icon;
