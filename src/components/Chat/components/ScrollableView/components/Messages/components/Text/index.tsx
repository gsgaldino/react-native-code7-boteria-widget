import React from 'react';
import { Text as P, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bot: {
    color: '#5A5D68',
  },
  user: {
    color: '#fff',
  },
});

function Text({ message, from }: any) {
  const textColor = from === 'bot' ? styles.bot : styles.user;

  return <P style={textColor}>{message}</P>;
}

export default Text;
