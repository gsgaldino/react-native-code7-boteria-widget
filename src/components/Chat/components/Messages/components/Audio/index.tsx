import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { Message } from '../../../../../../types/Message';

import Slider from './components/Slider';
import PlayPauseButton from './components/PlayPauseButton';
import Sound from 'react-native-sound';

import { secondsToMinutesAndSeconds } from './utils/millisToMinutesAndSeconds';
import { getPlayedPercentage } from './utils/getPlayedPercentage';
import { getPlayedPosition } from './utils/getPlayerPosition';

import { styles } from './styles';

const THREE_HUNDRED_MILLIS = 300;

const AudioComponent: React.FC<Message> = (props) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  const interval = useRef<null | NodeJS.Timer>();
  const sound = useRef<Sound | null>(
    new Sound(props.audio?.fileUrl, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      } else {
        setDuration(Math.floor(sound.current?.getDuration() as number));
      }
    })
  );

  useEffect(
    () => () => {
      sound.current?.release();
      sound.current = null;
      clearInterval(interval.current as NodeJS.Timeout);
    },
    []
  );

  const updateCurrentTime = useCallback(() => {
    sound.current?.getCurrentTime((seconds) => {
      setCurrentTime(Math.floor(seconds));
    });
  }, [sound.current]);

  const togglePlayback = useCallback(() => {
    if (playing) {
      sound.current?.pause();
      setPlaying(false);
      clearInterval(interval.current as NodeJS.Timeout);
    } else {
      sound.current?.play(() => {
        sound.current?.release();
        setPlaying(false);
      });

      interval.current = setInterval(updateCurrentTime, THREE_HUNDRED_MILLIS);
      setPlaying(true);
    }
  }, [sound.current, playing]);

  const onSliderChange = (value: number) => {
    sound.current?.setCurrentTime(
      getPlayedPosition({
        duration,
        playedPercentage: value,
      })
    );
  };

  return (
    <View style={styles.audio}>
      <PlayPauseButton isPlaying={playing} onPress={togglePlayback} />

      <Text style={styles.duration}>
        {secondsToMinutesAndSeconds(currentTime)} /{' '}
        {secondsToMinutesAndSeconds(duration)}
      </Text>

      <Slider
        onValueChange={onSliderChange}
        value={getPlayedPercentage({
          currentTime,
          duration,
        })}
      />
    </View>
  );
};

export default memo(AudioComponent);
