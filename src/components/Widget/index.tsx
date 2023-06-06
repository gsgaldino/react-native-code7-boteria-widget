import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import Icon from '../../components/Icon';
import { styles } from './styles';

interface IWidgetProps {
  onPress: (e: GestureResponderEvent) => void;
  imageUrl?: string;
}

export const Widget = ({ onPress, imageUrl }: IWidgetProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon imageUrl={imageUrl} />
    </TouchableOpacity>
  );
};
