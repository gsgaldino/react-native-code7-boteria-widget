import React, { memo, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
// import Sound from 'react-native-sound';

import type { Message } from '../../../../../../types';
// import Slider from './components/Slider';
// import PlayPauseButton from './components/PlayPauseButton';

import {
  secondsToMinutesAndSeconds,
  // getPlayedPercentage,
  // getPlayedPosition,
} from './utils';

import { styles } from './styles';

// const THREE_HUNDRED_MILLIS = 300;

const AudioComponent: React.FC<Message> = (props) => {
  console.log('VIDEO PROPS', props);
  // const [duration, setDuration] = useState(0);
  const [currentTime] = useState(0);
  // const [playing] = useState(false);

  // const interval = useRef<null | NodeJS.Timer>();
  // const sound = useRef<Sound | null>(
  //   new Sound(props.audio?.fileUrl, Sound.MAIN_BUNDLE, (error: any) => {
  //     if (error) {
  //       throw error;
  //     } else {
  //       setDuration(Math.floor(sound.current?.getDuration() as number));
  //     }
  //   })
  // );

  useEffect(
    () => () => {
      // sound.current?.release();
      // sound.current = null;
      // clearInterval(interval.current as NodeJS.Timeout);
    },
    []
  );

  // const updateCurrentTime = useCallback(() => {
  //   return;
  //   sound.current?.getCurrentTime((seconds: any) => {
  //     setCurrentTime(Math.floor(seconds));
  //   });
  // }, []);

  // const togglePlayback = useCallback(() => {
  //   if (playing) {
  //     sound.current?.pause();
  //     setPlaying(false);
  //     clearInterval(interval.current as NodeJS.Timeout);
  //   } else {
  //     sound.current?.play(() => {
  //       sound.current?.release();
  //       setPlaying(false);
  //     });

  //     interval.current = setInterval(updateCurrentTime, THREE_HUNDRED_MILLIS);
  //     setPlaying(true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sound.current, playing]);

  // const onSliderChange = (value: number) => {
  //   sound.current?.setCurrentTime(
  //     getPlayedPosition({
  //       duration,
  //       playedPercentage: value,
  //     })
  //   );
  // };

  return (
    <View style={styles.audio}>
      {/* <PlayPauseButton isPlaying={playing} onPress={togglePlayback} /> */}

      <Text style={styles.duration}>
        {secondsToMinutesAndSeconds(currentTime)} /{' '}
        {/* {secondsToMinutesAndSeconds(duration)} */}
      </Text>

      {/* <Slider
        onValueChange={onSliderChange}
        value={getPlayedPercentage({
          currentTime,
          duration,
        })}
      /> */}
    </View>
  );
};

export default memo(AudioComponent);
