import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useChatConfigurations } from '../../../../context/ChatConfigurationsContext';
import { useMessageList } from '../../../../context/MessageListContext';
import { useSession } from '../../../../context/SessionContext';

import Icon from '../../../Icon';
import closeIcon from '../../../../assets/icons/CloseIcon.png';
import resetIcon from '../../../../assets/icons/ResetIcon.png';

import { styles } from './styles';

function Header() {
  const { messageList } = useMessageList();
  const { session } = useSession();
  const { chatConfigurations, updateState } = useChatConfigurations();

  const onClose = () => {
    chatConfigurations.close();
    updateState();
  };

  const onRestartConversation = () => {
    messageList?.clearMessages();
    session.clearSession();
  };

  return (
    <View
      style={[
        styles.container,
        styles.wrapper,
        {
          backgroundColor: chatConfigurations.settings?.mainColor,
        },
      ]}
    >
      <View style={styles.titleContainer}>
        <Icon />
        <Text style={styles.title}>{chatConfigurations.title}</Text>
      </View>

      <View style={styles.iconsWrapper}>
        <TouchableOpacity
          testID="restartConversation"
          onPress={onRestartConversation}
        >
          <View style={styles.iconContainer}>
            <Image source={resetIcon} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity testID="closeChat" onPress={onClose}>
          <View style={styles.iconContainer}>
            <Image source={closeIcon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;
