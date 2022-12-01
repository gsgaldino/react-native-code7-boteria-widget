import React, { memo } from 'react';
import { Text as P, StyleSheet } from 'react-native';
import { Message, From } from '../../../../../../types/Message';
import { useChatConfigurations } from '../../../../../../context/ChatConfigurations';

const Text: React.FC<Message> = (msg) => {
  const { botConfigs } = useChatConfigurations();

  const styles = StyleSheet.create({
    bot: {
      color: botConfigs.colors.secondaryText,
    },
    user: {
      color: botConfigs.colors.mainText,
    },
  });

  const isBot = msg.from === From.BOT;
  const textColor = isBot ? styles.bot : styles.user;

  return <P style={textColor}>{msg.message}</P>;
};

export default memo(Text);
