import React from 'react';
import { View, Text } from 'react-native';
import { Message, From } from '../../../../../../types/message';

import { styles } from './styles';

const MessageHour = ({
  msg,
  botMessageColor,
  userMessageColor,
}: {
  msg: Message;
  botMessageColor: string;
  userMessageColor: string;
}) => {
  const alignmentClass =
    msg.from === From.BOT ? styles.rightAligned : styles.leftAligned;
  const hourColor =
    msg.from === From.BOT
      ? { color: botMessageColor }
      : { color: userMessageColor };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, alignmentClass, hourColor]}>{msg.hour}</Text>
    </View>
  );
};

export default MessageHour;
