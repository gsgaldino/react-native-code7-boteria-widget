import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import Icon from '../../components/Icon';
import { styles } from './styles';

type WidgetProps = {
  onPress: (e: GestureResponderEvent) => void;
  imageUrl?: string;
};

export const Widget = ({ onPress, imageUrl }: WidgetProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon imageUrl={imageUrl} />
    </TouchableOpacity>
  );
};
