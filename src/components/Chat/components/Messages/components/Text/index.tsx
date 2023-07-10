import React, { memo } from 'react';
import { Text as P, StyleSheet } from 'react-native';
import { From } from '../../../../../../types/message';
import type { IMessageComponentProps } from '../MessageComponent';
import LinkifyText from './components/LinkFyText';

const Text: React.FC<IMessageComponentProps> = (props) => {
  const styles = StyleSheet.create({
    container: {
      fontSize: 16,
    },
    bold: {
      fontWeight: 'bold',
    },
    bot: {
      color: props?.settings?.secondaryTextColor,
    },
    user: {
      color: props?.settings?.mainTextColor,
    },
    underline: {
      textDecorationLine: 'underline',
    },
  });

  const isBot = props.message.from === From.BOT;
  const textColor = isBot ? styles.bot : styles.user;

  return (
    <P style={[styles.container, textColor]}>
      <LinkifyText text={props.message.message || ''} />
    </P>
  );
};

export default memo(Text);
