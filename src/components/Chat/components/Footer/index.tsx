import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

import { styles } from './styles';

export interface IFooterProps {
  poweredBy: string;
  poweredByUrl: string;
}

export const Footer = ({ poweredBy, poweredByUrl }: IFooterProps) => {
  const onTextPress = () => Linking.openURL(poweredByUrl);

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity testID="poweredBy" onPress={onTextPress}>
        <Text style={styles.footerText}>{poweredBy}</Text>
      </TouchableOpacity>
    </View>
  );
};
