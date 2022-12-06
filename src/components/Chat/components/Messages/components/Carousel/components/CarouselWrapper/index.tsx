import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

const CarouselWrapper: React.FC<React.ReactNode> = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

export default CarouselWrapper;
