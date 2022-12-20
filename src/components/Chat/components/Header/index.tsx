import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useChatConfigurations } from '../../../../context/ChatConfigurations';
import { useSocketContext } from '../../../../context/Socket/Component';
import Icon from '../../../Icon';

import closeIcon from '../../../../assets/icons/CloseIcon.png';
import resetIcon from '../../../../assets/icons/ResetIcon.png';

import { styles } from './styles';

function Header() {
  const { isChatOpen, toggleIsChatOpen, botConfigs } = useChatConfigurations();
  const { restartConversation } = useSocketContext();

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

      <View style={styles.iconsWrapper}>
        <TouchableOpacity onPress={() => restartConversation()}>
          <View style={styles.iconContainer}>
            <Image source={resetIcon} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose}>
          <View style={styles.iconContainer}>
            <Image source={closeIcon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;
