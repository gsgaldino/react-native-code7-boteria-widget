import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Code7Boteria } from 'react-native-code7-boteria-widget';

export default function App() {
  return (
    <View style={styles.container}>
      <Code7Boteria botId="62446ad53286a300137a0fed" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
