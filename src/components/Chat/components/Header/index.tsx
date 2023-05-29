import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import Icon from '../../../Icon';
import closeIcon from '../../../../assets/icons/CloseIcon.png';
import resetIcon from '../../../../assets/icons/ResetIcon.png';

import { styles } from './styles';

interface IHeaderProps {
  close: () => void;
  restartConversation: () => void;
  title: string;
  mainColor?: string;
}

export const Header = ({
  close,
  restartConversation,
  title,
  mainColor,
}: IHeaderProps) => {
  const onClose = () => close();

  const onRestartConversation = () => restartConversation();

  return (
    <View
      style={[
        styles.container,
        styles.wrapper,
        {
          backgroundColor: mainColor,
        },
      ]}
    >
      <View style={styles.titleContainer}>
        <Icon />
        <Text style={styles.title}>{title}</Text>
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
};
