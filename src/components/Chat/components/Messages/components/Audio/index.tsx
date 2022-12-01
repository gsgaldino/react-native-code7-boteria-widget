import React, { memo } from 'react';
import { Message } from 'types/Message';
import { Video } from 'expo-av';

import { styles } from './styles';

const AudioComponent: React.FC<Message> = (props) => {
  return (
    <Video
      style={styles.audio}
      useNativeControls
      source={{
        uri: props.audio?.fileUrl as string,
      }}
    />
  );
};

export default memo(AudioComponent);
