import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { styles } from './styles';

interface ICarouselCardButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

const CarouselCardButton = ({
  children,
  onPress,
}: ICarouselCardButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default CarouselCardButton;
