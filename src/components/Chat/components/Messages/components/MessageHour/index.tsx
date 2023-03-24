import React from 'react';
import { View, Text } from 'react-native';
import { Message, From } from '../../../../../../types/message';

import { styles } from './styles';

const MessageHour = ({ msg }: { msg: Message }) => {
  const alignmentClass =
    msg.from === From.BOT ? styles.rightAligned : styles.leftAligned;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, alignmentClass]}>{msg.hour}</Text>
    </View>
  );
};

export default MessageHour;
