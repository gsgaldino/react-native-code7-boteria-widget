import type { CSSProperties, ReactNode } from 'react';
import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

interface ICarouselSliderContentProps {
  style: CSSProperties;
  children: ReactNode;
}

const CarouselSliderContent = (props: ICarouselSliderContentProps) => {
  return (
    <View style={[styles.container, { left: props.style.left }]}>
      {props.children}
    </View>
  );
};

export default CarouselSliderContent;
