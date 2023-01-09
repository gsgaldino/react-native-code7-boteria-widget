import React from 'react';
import { View, Text } from 'react-native';

import Chat from './components/Chat';
import WidgetComponent from './components/Widget';
import { useChatConfigurations } from './context/ChatConfigurations';
import { styles } from './styles';

type Props = {
  customWidget: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function App({ customWidget }: Props) {
  const { toggleIsChatOpen } = useChatConfigurations();

  const newComponent =
    React.isValidElement(customWidget) &&
    React.cloneElement(customWidget as React.ReactElement, {
      onPress: toggleIsChatOpen,
    });

  return (
    <View style={styles.app}>
      <Text>yo boteria</Text>
      <Chat />

      {newComponent || <WidgetComponent onPress={() => toggleIsChatOpen()} />}
    </View>
  );
}

export default App;
