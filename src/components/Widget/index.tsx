import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import Icon from '../../components/Icon';
import { styles } from './styles';

type WidgetProps = {
  onPress: (e: GestureResponderEvent) => void;
};

export const Widget = ({ onPress }: WidgetProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};
