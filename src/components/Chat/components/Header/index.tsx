import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useIsChatOpen } from '../../../../context/IsChatOpen';

import closeIcon from '../../../../assets/close_icon.png';
import botIcon from '../../../../assets/widget.png';

import { styles } from './styles';

function Header() {
  const { isChatOpen, toggleIsChatOpen } = useIsChatOpen();

  const onClose = () => !!isChatOpen && toggleIsChatOpen();

  return (
    <View style={[styles.container, styles.wrapper]}>
      <View style={styles.titleContainer}>
        <Image source={botIcon} style={styles.titleIcon} />
        <Text style={styles.title}>Bot title</Text>
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
