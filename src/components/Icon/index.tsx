import React from 'react';
import { Image } from 'react-native';
import { useChatConfigurations } from '../../context/ChatConfigurationsContext';

import widgetImage from '../../assets/widget.png';
import { styles } from './styles';

function Icon() {
  const { chatConfigurations } = useChatConfigurations();

  const uri = chatConfigurations.settings?.botFab
    ? { uri: chatConfigurations.settings?.botFab }
    : widgetImage;

  return <Image source={uri} style={styles.image} />;
}

export default Icon;
