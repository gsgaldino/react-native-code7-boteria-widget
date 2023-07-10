import React from 'react';
import { View, StyleSheet } from 'react-native';
import { From, MessageTypes } from '../../../../../types/message';
import MessageHour from '../components/MessageHour';
import { MessageStatusWrapper } from '../components/MessageStatus';

import type { IMessageComponentProps } from '../components/MessageComponent';

export default (MessageComponent: React.FC<IMessageComponentProps>) => {
  const MessageWrapper = (props: IMessageComponentProps) => {
    const styles = StyleSheet.create({
      container: {
        borderTopRightRadius: 16,
        borderTopStartRadius: 16,
        maxWidth: 320,
        minWidth: 80,
        padding: 16,
        paddingBottom: 0,
      },
      bot: {
        backgroundColor: props?.settings?.secondaryColor,
        alignSelf: 'flex-start',
        borderBottomEndRadius: 16,
        borderBottomStartRadius: 4,
      },
      user: {
        backgroundColor: props?.settings?.mainColor,
        alignSelf: 'flex-end',
        borderBottomEndRadius: 4,
        borderBottomStartRadius: 16,
      },
    });

    const ballonStyle =
      props.message.from === From.BOT ? styles.bot : styles.user;

    return (
      <MessageStatusWrapper
        type={props.message.type}
        from={props.message.from}
        status={props.message.status || 'sent'}
      >
        <View style={[styles.container, ballonStyle]}>
          <MessageComponent {...(props as IMessageComponentProps)} />
          {props.message.type !== MessageTypes.TYPING && (
            <MessageHour
              msg={props.message}
              botMessageColor={props.settings?.secondaryTextColor as string}
              userMessageColor={props.settings?.mainTextColor as string}
            />
          )}
        </View>
      </MessageStatusWrapper>
    );
  };

  return MessageWrapper;
};
