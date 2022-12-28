import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import Icon from '../../components/Icon';
import { styles } from './styles';

type Props = {
  onPress: (e: GestureResponderEvent) => void;
};

function Widget({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
}

export default Widget;
