import React from 'react';

import { SafeAreaView } from 'react-native';
import Chat from './components/Chat';
import WidgetComponent from './components/Widget';
import { useChatConfigurations } from './context/ChatConfigurationsContext';

type Props = {
  customWidget: React.ReactNode;
};

function App({ customWidget }: Props) {
  const { chatConfigurations, updateState } = useChatConfigurations();

  const toggleIsChatOpen = () => {
    chatConfigurations.toggleIsOpen();
    updateState();
  };

  const newComponent =
    React.isValidElement(customWidget) &&
    React.cloneElement(customWidget as React.ReactElement, {
      onPress: toggleIsChatOpen,
    });

  return (
    <SafeAreaView>
      <Chat />
      {newComponent || <WidgetComponent onPress={toggleIsChatOpen} />}
    </SafeAreaView>
  );
}

export default App;
