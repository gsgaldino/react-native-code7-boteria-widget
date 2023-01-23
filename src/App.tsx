import React from 'react';

import { SafeAreaView } from 'react-native';
import Chat from './components/Chat';
import WidgetComponent from './components/Widget';
import { useChatConfigurations } from './context/ChatConfigurations';

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
    <SafeAreaView>
      <Chat />
      {newComponent || <WidgetComponent onPress={() => toggleIsChatOpen()} />}
    </SafeAreaView>
  );
}

export default App;
