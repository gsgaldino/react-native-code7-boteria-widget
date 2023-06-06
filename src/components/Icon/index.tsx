import React from 'react';
import { Image, ActivityIndicator, View } from 'react-native';

import { styles } from './styles';

function Icon({ imageUrl }: { imageUrl?: string }) {
  return imageUrl ? (
    <Image source={{ uri: imageUrl }} style={styles.image} />
  ) : (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

export default Icon;
