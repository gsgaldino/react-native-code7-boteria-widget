import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Code7Boteria } from 'react-native-code7-boteria-widget';

export default function App() {
  return (
    <View style={styles.container}>
      <Code7Boteria
        staging
        botId="62e9145fc073550012d52f25"
        params={{
          name: 'Joe Doe',
        }}
      />
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
