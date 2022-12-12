import React, { memo, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Message } from '../../../../../../types/Message';

import Slider from './components/Slider';
import PlayPauseButton from './components/PlayPauseButton';

import { Audio, AVPlaybackStatusSuccess } from 'expo-av';

import { millisToMinutesAndSeconds } from './utils/millisToMinutesAndSeconds';
import { getPlayedPercentage } from './utils/getPlayedPercentage';
import { getPlayedPosition } from './utils/getPlayerPosition';

import { styles } from './styles';

const AudioComponent: React.FC<Message> = (props) => {
  const [soundState, setSoundState] = useState<undefined | Audio.Sound>();
  const [playbackStatus, setPlaybackStatus] = useState<
    undefined | AVPlaybackStatusSuccess
  >();

  async function playSound() {
    await soundState?.playAsync();
  }

  async function pauseSound() {
    await soundState?.pauseAsync();
  }

  const onPlayPausePress = () => {
    playbackStatus?.isPlaying ? pauseSound() : playSound();
  };

  const onSliderChange = (value: number) => {
    soundState?.setPositionAsync(
      getPlayedPosition({
        duration: playbackStatus?.durationMillis as number,
        playedPercentage: value,
      })
    );
  };

  useEffect(() => {
    (async () => {
      const { sound } = await Audio.Sound.createAsync({
        uri: props.audio?.fileUrl as string,
      });

      sound.setOnPlaybackStatusUpdate((status) =>
        setPlaybackStatus(status as AVPlaybackStatusSuccess)
      );

      setSoundState(sound as Audio.Sound);
    })();
  }, []);

  useEffect(() => {
    return soundState
      ? () => {
          soundState.unloadAsync();
        }
      : undefined;
  }, [soundState]);

  return (
    <View style={styles.audio}>
      <PlayPauseButton
        isPlaying={!!playbackStatus?.isPlaying}
        onPress={onPlayPausePress}
      />

      <Text style={styles.duration}>
        {millisToMinutesAndSeconds(playbackStatus?.positionMillis as number)} /{' '}
        {millisToMinutesAndSeconds(playbackStatus?.durationMillis as number)}
      </Text>

      <Slider
        onValueChange={onSliderChange}
        value={getPlayedPercentage({
          currentTime: playbackStatus?.positionMillis as number,
          duration: playbackStatus?.durationMillis as number,
        })}
      />
    </View>
  );
};

export default memo(AudioComponent);
