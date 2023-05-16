import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';

import { useChatConfigurations } from '../../../../context/ChatConfigurationsContext';

import { styles } from './styles';

function Footer() {
  const { chatConfigurations } = useChatConfigurations();
  const hasText = !!chatConfigurations?.poweredBy;

  const onTextPress = () => Linking.openURL(chatConfigurations.poweredByUrl);

  return hasText ? (
    <View style={styles.footerContainer}>
      <TouchableOpacity testID="poweredBy" onPress={onTextPress}>
        <Text style={styles.footerText}>{chatConfigurations.poweredBy}</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View />
  );
}

export default Footer;
