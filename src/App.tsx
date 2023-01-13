import React from 'react';

import Chat from './components/Chat';
import WidgetComponent from './components/Widget';
import { useChatConfigurations } from './context/ChatConfigurations';
// import { styles } from './styles';

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
    <>
      <Chat />
      {newComponent || <WidgetComponent onPress={() => toggleIsChatOpen()} />}
    </>
  );
}

export default App;
