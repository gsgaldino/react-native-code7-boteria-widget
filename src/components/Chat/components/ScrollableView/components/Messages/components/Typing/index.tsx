import React, { useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';

import { styles } from './styles';

const TWO_HUNDRED_MILLISECONDS = 200;

const Typing: React.FC = () => {
  const dots = [
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(2)).current,
    useRef(new Animated.Value(3)).current,
  ];

  const bounce = () => {
    const duration = TWO_HUNDRED_MILLISECONDS;

    Animated.sequence([
      Animated.timing(dots[0] as Animated.Value, {
        toValue: -4,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(dots[0] as Animated.Value, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(dots[1] as Animated.Value, {
        toValue: -4,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(dots[1] as Animated.Value, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(dots[2] as Animated.Value, {
        toValue: -4,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(dots[2] as Animated.Value, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      bounce();
    }, 1200);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.wrapper}>
      {dots.map((dotAnimation, index) => (
        <Animated.View
          key={index}
          style={[styles.dot, { transform: [{ translateY: dotAnimation }] }]}
        />
      ))}
    </View>
  );
};

export default Typing;
