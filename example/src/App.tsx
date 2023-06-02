import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Code7Boteria } from 'react-native-code7-boteria-widget';

export default function App() {
  return (
    <View style={styles.container}>
      <Code7Boteria
        botId="6452721a96898b72321ba3cb"
        params={{
          name: 'Joe Doe',
        }}
        appearance={{
          settings: {
            mainColor: '#FF0000',
            secondaryColor: '#00FF00',
          },
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
