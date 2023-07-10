import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import Sound from 'react-native-sound';

import type { IMessageComponentProps } from '../MessageComponent';
import { From } from '../../../../../../types';

import Slider from './components/Slider';
import PlayPauseButton from './components/PlayPauseButton';

import {
  secondsToMinutesAndSeconds,
  getPlayedPercentage,
  getPlayedPosition,
} from './utils';

import { styles } from './styles';

const THREE_HUNDRED_MILLIS = 300;

const AudioComponent: React.FC<IMessageComponentProps> = (props) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  const interval = useRef<null | NodeJS.Timer>();
  const sound = useRef<Sound | null>(null);

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.release();
      }
      clearInterval(interval.current as NodeJS.Timer);
    };
  }, []);

  const loadAudio = useCallback(() => {
    sound.current = new Sound(
      props.message.audio?.fileUrl,
      Sound.MAIN_BUNDLE,
      (error: any) => {
        if (error) {
          Alert.alert('Formato de áudio não suportado.');
        } else {
          setDuration(Math.floor(sound.current?.getDuration() as number));
        }
      }
    );
  }, [props.message.audio?.fileUrl]);

  useEffect(() => {
    loadAudio();
  }, [loadAudio]);

  const updateCurrentTime = useCallback(() => {
    sound.current?.getCurrentTime((seconds: any) => {
      setCurrentTime(Math.floor(seconds));
    });
  }, []);

  const togglePlayback = useCallback(() => {
    if (playing) {
      sound.current?.pause();
      setPlaying(false);
      clearInterval(interval.current as NodeJS.Timer);
    } else {
      sound.current?.play((success: boolean) => {
        if (success) {
          setPlaying(false);
          sound.current?.setCurrentTime(0);
          setCurrentTime(0);
          clearInterval(interval.current as NodeJS.Timer);
        }
      });

      interval.current = setInterval(updateCurrentTime, THREE_HUNDRED_MILLIS);
      setPlaying(true);
    }
  }, [playing, updateCurrentTime]);

  const onSliderChange = (value: number) => {
    sound.current?.setCurrentTime(
      getPlayedPosition({
        duration,
        playedPercentage: value,
      })
    );
  };

  const foreground =
    props.message.from === From.BOT
      ? props.settings?.secondaryTextColor
      : props.settings?.mainTextColor;

  return (
    <View style={styles.audio}>
      <PlayPauseButton isPlaying={playing} onPress={togglePlayback} />

      <Text
        style={[
          styles.duration,
          {
            color: foreground,
          },
        ]}
      >
        {secondsToMinutesAndSeconds(currentTime)} /{' '}
        {secondsToMinutesAndSeconds(duration)}
      </Text>

      <Slider
        tintColor="#000000"
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
