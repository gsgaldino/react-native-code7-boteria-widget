import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { Code7Boteria } from 'react-native-code7-boteria-widget';

const App: React.FC = () => {
  const variables = {
    nome: 'Gabriel Soares',
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>My application</Text>
      </View>

      <Code7Boteria botId="62ec1ac218ba8f42452383a6" params={variables} />
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
