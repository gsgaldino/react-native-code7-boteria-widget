import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';
import { View } from 'react-native';

interface ICustomImageProps {
  src: string;
}

const CustomImage = (props: ICustomImageProps) => {
  return (
    <View style={styles.wrapperContainer}>
      <Image style={styles.container} source={{ uri: props.src }} />
    </View>
  );
};

export default CustomImage;
