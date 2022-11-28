import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useChatConfigurations } from '../../../../context/ChatConfigurations';
import { Icon } from '../../..';

import closeIcon from '../../../../assets/close_icon.png';

import { styles } from './styles';

function Header() {
  const { isChatOpen, toggleIsChatOpen, botConfigs } = useChatConfigurations();

  const onClose = () => !!isChatOpen && toggleIsChatOpen();

  return (
    <View
      style={[
        styles.container,
        styles.wrapper,
        {
          backgroundColor: botConfigs.colors.main,
        },
      ]}
    >
      <View style={styles.titleContainer}>
        <Icon />
        <Text style={styles.title}>{botConfigs.title}</Text>
      </View>

      <TouchableOpacity onPress={onClose}>
        <View style={styles.closeIconContainer}>
          <Image source={closeIcon} style={styles.closeIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Header;
