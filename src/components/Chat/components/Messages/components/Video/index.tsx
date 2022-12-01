import React, { memo } from 'react';
import { Message } from 'types/Message';
import { Video } from 'expo-av';

import { styles } from './styles';

const VideoComponent: React.FC<Message> = (props) => {
  return (
    <Video
      style={styles.video}
      useNativeControls
      source={{
        uri: props.video?.fileUrl as string,
      }}
    />
  );
};

export default memo(VideoComponent);
