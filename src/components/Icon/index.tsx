import React from 'react';
import { Image } from 'react-native';
import { useChatConfigurations } from '../../context/ChatConfigurations';

import widgetImage from '../../assets/widget.png';
import { styles } from './styles';

function Icon() {
  const { botConfigs } = useChatConfigurations();

  const uri = botConfigs?.botFab ? { uri: botConfigs.botFab } : widgetImage;

  return <Image source={uri} style={styles.image} />;
}

export default Icon;
