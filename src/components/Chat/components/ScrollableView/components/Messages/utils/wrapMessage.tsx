import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderTopRightRadius: 16,
    borderTopStartRadius: 16,
    maxWidth: 227,
    padding: 16,
  },
  bot: {
    backgroundColor: '#F3F5F9',
    alignSelf: 'flex-start',
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 4,
    marginLeft: 16,
  },
  user: {
    backgroundColor: '#0086FF',
    alignSelf: 'flex-end',
    marginRight: 16,
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 16,
  },
});

export default (MessageComponent: any) => {
  const MessageWrapper = (props: any) => {
    const ballonStyle = props.from === 'bot' ? styles.bot : styles.user;

    return (
      <View style={[styles.container, ballonStyle]}>
        <MessageComponent {...props} />
      </View>
    );
  };

  return MessageWrapper;
};
