import React, { useEffect, memo, useRef } from 'react';
import { View, Animated } from 'react-native';
import type { IMessageComponentProps } from '../MessageComponent';

import { styles } from './styles';

const ONE_HUNDRED_EIGHTY = 180;

const Typing: React.FC<IMessageComponentProps> = (props) => {
  const dots = {
    one: useRef(new Animated.Value(0)).current,
    two: useRef(new Animated.Value(0)).current,
    three: useRef(new Animated.Value(0)).current,
  };

  const bounce = () => {
    const bounceUp: Animated.TimingAnimationConfig = {
      toValue: -4,
      duration: ONE_HUNDRED_EIGHTY,
      useNativeDriver: true,
    };

    const bounceDown: Animated.TimingAnimationConfig = {
      toValue: 0,
      duration: ONE_HUNDRED_EIGHTY,
      useNativeDriver: true,
    };

    Animated.sequence([
      Animated.timing(dots.one, bounceUp),
      Animated.timing(dots.two, bounceUp),
      Animated.timing(dots.three, bounceUp),
      Animated.timing(dots.one, bounceDown),
      Animated.timing(dots.two, bounceDown),
      Animated.timing(dots.three, bounceDown),
    ]).start(() => bounce());
  };

  useEffect(() => {
    bounce();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.dot,
          { transform: [{ translateY: dots.one }] },
          { backgroundColor: props?.settings?.secondaryTextColor },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          { transform: [{ translateY: dots.two }] },
          { backgroundColor: props?.settings?.secondaryTextColor },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          { transform: [{ translateY: dots.three }] },
          { backgroundColor: props?.settings?.secondaryTextColor },
        ]}
      />
    </View>
  );
};

export default memo(Typing);
