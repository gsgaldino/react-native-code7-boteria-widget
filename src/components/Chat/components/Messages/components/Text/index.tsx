import React, { memo } from 'react';
import { Text as P, StyleSheet } from 'react-native';
import { Message, From } from '../../../../../../types/message';
import { useChatConfigurations } from '../../../../../../context/ChatConfigurationsContext';

const Text: React.FC<Message> = (msg) => {
  const { chatConfigurations } = useChatConfigurations();

  const styles = StyleSheet.create({
    container: {
      fontSize: 16,
    },
    bot: {
      color: chatConfigurations.settings.secondaryTextColor,
    },
    user: {
      color: chatConfigurations.settings.mainTextColor,
    },
  });

  const isBot = msg.from === From.BOT;
  const textColor = isBot ? styles.bot : styles.user;

  return <P style={[styles.container, textColor]}>{msg.message}</P>;
};

export default memo(Text);
