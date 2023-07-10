import type { ReactNode } from 'react';
import React, { useEffect, useRef } from 'react';

import { ScrollView } from 'react-native';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

interface ICarouselSliderContentProps {
  children: ReactNode;
  slidePosition: number;
  onSlidePosition: Function;
}

const SLIDE_WIDTH = 210;

const CarouselSliderContent = (props: ICarouselSliderContentProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const { slidePosition, onSlidePosition } = props;

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: slidePosition * SLIDE_WIDTH,
        y: 0,
        animated: true,
      });
    }
  }, [slidePosition]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newCurrentIndex = Math.round(contentOffsetX / SLIDE_WIDTH);
    onSlidePosition(newCurrentIndex);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentOffset={{ x: slidePosition * SLIDE_WIDTH, y: 0 }}
      onMomentumScrollEnd={handleScrollEnd}
    >
      {props.children}
    </ScrollView>
  );
};

export default CarouselSliderContent;
