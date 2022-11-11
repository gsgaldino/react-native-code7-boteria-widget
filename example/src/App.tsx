import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Widget } from 'react-native-code7-boteria-widget';

export default function App() {
  return (
    <View style={styles.container}>
      <Widget botId="62446ad53286a300137a0fed" />
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
