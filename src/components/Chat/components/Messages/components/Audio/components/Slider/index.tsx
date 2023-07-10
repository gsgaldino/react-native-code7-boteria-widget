import React from 'react';
import { View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';

import { styles } from './styles';

interface IProgressBarProps {
  onValueChange: (value: number) => void;
  value: number;
  tintColor: string;
}

const SliderComponent = (props: IProgressBarProps) => {
  return (
    <View style={styles.container}>
      <Slider
        value={props.value || 0}
        thumbTintColor={props.tintColor}
        onSlidingComplete={(value: any) => props.onValueChange(Number(value))}
        minimumTrackTintColor={props.tintColor}
      />
    </View>
  );
};

export default SliderComponent;
