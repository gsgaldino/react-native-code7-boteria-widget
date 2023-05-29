import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// import { useChatConfigurations } from '../../../../context/ChatConfigurationsContext';

import { styles } from './styles';

export const Footer = () => {
  // const { chatConfigurations } = useChatConfigurations();
  // const hasText = !!chatConfigurations?.poweredBy;

  // const onTextPress = () => Linking.openURL(chatConfigurations.poweredByUrl);

  const hasText = true;

  return hasText ? (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        testID="poweredBy"
        onPress={() => console.log('FOOTER PRESSED')}
      >
        <Text style={styles.footerText}>Footer Text</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View />
  );
};
