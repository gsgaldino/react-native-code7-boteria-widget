import React, { memo } from 'react';
import { Message } from '../../../../../../types/Message';
import Video from 'react-native-video';

import { styles } from './styles';

const VideoComponent: React.FC<Message> = (props) => {
  const uri = props.video ? props.video.fileUrl : props.document?.fileUrl;

  return <Video source={{ uri }} style={styles.video} controls={true} />;
};

export default memo(VideoComponent);
