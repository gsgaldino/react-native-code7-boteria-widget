import React from 'react';
import type { IMessageComponentProps } from '../MessageComponent';

import Video from 'react-native-video';

import { styles } from './styles';

const VideoComponent: React.FC<IMessageComponentProps> = (props) => {
  const uri = props.message.video
    ? props.message.video.fileUrl
    : props.message.document?.fileUrl;

  return (
    <Video
      testID="video-player"
      playWhenInactive={false}
      playInBackground={false}
      resizeMode="stretch"
      paused={true}
      source={{ uri }}
      style={styles.video}
      controls={true}
    />
  );
};

export default VideoComponent;
