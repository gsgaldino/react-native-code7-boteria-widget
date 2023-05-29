import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { Code7Boteria } from 'react-native-code7-boteria-widget';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>My chat app</Text>
      <Code7Boteria botId="6452721a96898b72321ba3cb" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
