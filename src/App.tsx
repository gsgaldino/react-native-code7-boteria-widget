import React from 'react';
import { View } from 'react-native';

import { Chat, Widget as WidgetComponent } from './components';
import { useChatConfigurations } from './context/ChatConfigurations';
import { styles } from './styles';

type Props = {
  customWidget: React.ReactNode;
};

function App({ customWidget }: Props) {
  const { toggleIsChatOpen } = useChatConfigurations();

  const newComponent =
    React.isValidElement(customWidget) &&
    React.cloneElement(customWidget as React.ReactElement, {
      onPress: toggleIsChatOpen,
    });

  return (
    <View style={styles.app}>
      <Chat />
      {newComponent || <WidgetComponent onPress={() => toggleIsChatOpen()} />}
    </View>
  );
}

export default App;
