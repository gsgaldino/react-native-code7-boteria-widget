import React from 'react';
import type { Message } from '../../../../../../types';
// import Video from 'react-native-video';

// import { styles } from './styles';

const VideoComponent: React.FC<Message> = (props) => {
  console.log('VIDEO PROPS', props);
  // const uri = props.video ? props.video.fileUrl : props.document?.fileUrl;

  return (
    <></>
    // <Video
    //   testID="video-player"
    //   playWhenInactive={false}
    //   playInBackground={false}
    //   paused={true}
    //   source={{ uri }}
    //   style={styles.video}
    //   controls={true}
    // />
  );
};

export default VideoComponent;
