import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { Code7Boteria } from '../../lib/commonjs';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>My application</Text>
      </View>
      <Code7Boteria botId="62ec1ac218ba8f42452383a6" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
