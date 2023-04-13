import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';

import { useChatConfigurations } from '../../../../context/ChatConfigurations';

import { styles } from './styles';

function Footer() {
  const { botConfigs } = useChatConfigurations();
  const hasText = !!botConfigs.poweredBy;

  const onTextPress = () => Linking.openURL(botConfigs.poweredByUrl);

  return hasText ? (
    <View style={styles.footerContainer}>
      <TouchableOpacity testID="poweredBy" onPress={onTextPress}>
        <Text style={styles.footerText}>{botConfigs.poweredBy}</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View />
  );
}

export default Footer;
