import React from 'react';
import {
  View,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
} from 'react-native';

import FaChevronLeft from '../../../../../../../../assets/icons/FaChevronLeft.png';
import FaChevronRight from '../../../../../../../../assets/icons/FaChevronRight.png';
import { styles } from './styles';

interface ICarouselActionsProps {
  onPrevious: (event: GestureResponderEvent) => void;
  onNext: (event: GestureResponderEvent) => void;
  previousDisabled: boolean;
  nextDisabled: boolean;
}

const CarouselActions = (props: ICarouselActionsProps) => {
  const nextDisabledClass = props.nextDisabled ? styles.disabled : null;
  const prevDisabledClass = props.previousDisabled ? styles.disabled : null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={props.onPrevious}
        disabled={props.previousDisabled}
        style={[styles.actionButton, prevDisabledClass]}
      >
        <Image style={styles.actionButtonIcon} source={FaChevronLeft} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, nextDisabledClass]}
        onPress={props.onNext}
        disabled={props.nextDisabled}
      >
        <Image style={styles.actionButtonIcon} source={FaChevronRight} />
      </TouchableOpacity>
    </View>
  );
};

export default CarouselActions;
