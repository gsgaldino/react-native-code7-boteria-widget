import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import { useIsChatOpen } from '../../context/IsChatOpen';
import widgetImage from '../../assets/widget.png';
import { styles } from './styles';

function Widget() {
  const { toggleIsChatOpen } = useIsChatOpen();

  const onChatToggle = () => toggleIsChatOpen();

  return (
    <TouchableOpacity style={styles.container} onPress={onChatToggle}>
      <Image source={widgetImage} style={styles.image} />
    </TouchableOpacity>
  );
}

export default Widget;
