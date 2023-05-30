import React from 'react';
import { View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';

import { styles } from './styles';

interface IProgressBarProps {
  onValueChange: (value: number) => void;
  value: number;
}

const SliderComponent = (props: IProgressBarProps) => {
  return (
    <View style={styles.container}>
      <Slider
        value={props.value || 0}
        thumbTintColor="#254EDB"
        onSlidingComplete={(value: any) => props.onValueChange(Number(value))}
        minimumTrackTintColor="#254EDB"
      />
    </View>
  );
};

export default SliderComponent;
