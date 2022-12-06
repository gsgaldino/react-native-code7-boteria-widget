import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

interface ICustomImageProps {
  src: string;
}

const CustomImage = (props: ICustomImageProps) => {
  return <Image style={styles.container} source={{ uri: props.src }} />;
};

export default CustomImage;
