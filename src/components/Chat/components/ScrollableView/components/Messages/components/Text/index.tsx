import React from 'react';
import { Text as P, StyleSheet } from 'react-native';
import { Message } from 'types/Message';

const styles = StyleSheet.create({
  bot: {
    color: '#5A5D68',
  },
  user: {
    color: '#fff',
  },
});

const Text: React.FC<Message> = (msg) => {
  const textColor = msg.from === 'bot' ? styles.bot : styles.user;

  return <P style={textColor}>{msg.message}</P>;
};

export default Text;
