import React from 'react';
import { View, ViewStyle } from 'react-native';

import { styles } from './styles';

interface ICarouselCardInfoProps {
  hasInfo: boolean;
  children: React.ReactNode[];
}

const CarouselCardInfo = (props: ICarouselCardInfoProps) => {
  const containerDisplayStyles: ViewStyle = {
    display: props.hasInfo ? 'flex' : 'none',
  };

  return (
    <View style={[styles.container, containerDisplayStyles]}>
      {props.children}
    </View>
  );
};

export default CarouselCardInfo;
