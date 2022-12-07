import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';

import FaPlay from '../../../../../../../../assets/icons/FaPlay.png';
import FaPause from '../../../../../../../../assets/icons/FaPause.png';

import { styles } from './styles';

interface IPlayPauseButtonProps {
  isPlaying: boolean;
  onPress: () => void;
}

const PlayPauseButton = (props: IPlayPauseButtonProps) => {
  return (
    <View style={styles.container}>
      {props.isPlaying ? (
        <TouchableOpacity onPress={props.onPress}>
          <Image source={FaPause} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={props.onPress}>
          <Image source={FaPlay} style={styles.image} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlayPauseButton;
