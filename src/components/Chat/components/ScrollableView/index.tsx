import React, { useRef } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import Messages from './components/Messages';

import { styles } from './styles';

function ScrollableView() {
  const scrollViewRef = useRef<null | ScrollView>(null);

  const onContentSizeChange = () => {
    scrollViewRef?.current?.scrollToEnd({ animated: true });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView ref={scrollViewRef} onContentSizeChange={onContentSizeChange}>
        <View style={styles.container}>
          <Messages />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default ScrollableView;
