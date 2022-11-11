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
  const scrollViewRef = useRef<any>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef?.current?.scrollToEnd({ animated: true })
        }
      >
        <View style={styles.container}>
          <Messages />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default ScrollableView;
