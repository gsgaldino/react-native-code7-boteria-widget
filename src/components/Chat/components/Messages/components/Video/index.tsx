import React, { memo } from 'react';
import { Message } from '../../../../../../types/Message';
import Video from 'react-native-video';

import { styles } from './styles';

const VideoComponent: React.FC<Message> = (props) => {
  return (
    <Video
      source={{ uri: props.video?.fileUrl as string }}
      style={styles.video}
      controls
      paused
    />
  );
};

export default memo(VideoComponent);
