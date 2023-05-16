import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Message, From, MessageTypes } from '../../../../../types/message';
import { useChatConfigurations } from '../../../../../context/ChatConfigurationsContext';
import MessageHour from '../components/MessageHour';
import { MessageStatusWrapper } from '../components/MessageStatus';

export default (MessageComponent: React.FC<Message>) => {
  const { chatConfigurations } = useChatConfigurations();

  const styles = StyleSheet.create({
    container: {
      borderTopRightRadius: 16,
      borderTopStartRadius: 16,
      maxWidth: 290,
      minWidth: 80,
      padding: 16,
      paddingBottom: 0,
    },
    bot: {
      backgroundColor: chatConfigurations.settings.secondaryColor,
      alignSelf: 'flex-start',
      borderBottomEndRadius: 16,
      borderBottomStartRadius: 4,
    },
    user: {
      backgroundColor: chatConfigurations.settings.mainColor,
      alignSelf: 'flex-end',
      borderBottomEndRadius: 4,
      borderBottomStartRadius: 16,
    },
  });

  const MessageWrapper = (props: Message) => {
    const ballonStyle = props.from === From.BOT ? styles.bot : styles.user;

    return (
      <MessageStatusWrapper
        type={props.type}
        from={props.from}
        status={props.status || 'sent'}
      >
        <View style={[styles.container, ballonStyle]}>
          <MessageComponent {...(props as Message)} />
          {props.type !== MessageTypes.TYPING && <MessageHour msg={props} />}
        </View>
      </MessageStatusWrapper>
    );
  };

  return MessageWrapper;
};
