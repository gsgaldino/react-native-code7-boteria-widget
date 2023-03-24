import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useChatConfigurations } from '../../../../context/ChatConfigurations';
import { useStorage } from '../../../../context/Storage/Component';
import { useSocketActions, useEncryptedStorage } from '../../../../hooks';

import Icon from '../../../Icon';
import closeIcon from '../../../../assets/icons/CloseIcon.png';
import resetIcon from '../../../../assets/icons/ResetIcon.png';

import { styles } from './styles';

function Header() {
  const { resetMessages } = useStorage();
  const { clear } = useEncryptedStorage();
  const { subscribe } = useSocketActions();
  const { isChatOpen, toggleIsChatOpen, botConfigs } = useChatConfigurations();

  const onClose = () => !!isChatOpen && toggleIsChatOpen();

  const onRestartConversation = async () => {
    resetMessages();
    await clear();
    await subscribe();
  };

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
        <TouchableOpacity onPress={onRestartConversation}>
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
