import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Message, From, MessageTypes } from '../../../../../types/Message';
import { useChatConfigurations } from '../../../../../context/ChatConfigurations';
import MessageHour from '../components/MessageHour';

export default (MessageComponent: React.FC<Message>) => {
  const { botConfigs } = useChatConfigurations();

  const styles = StyleSheet.create({
    container: {
      marginTop: 16,
      borderTopRightRadius: 16,
      borderTopStartRadius: 16,
      maxWidth: 290,
      minWidth: 80,
      padding: 16,
      paddingBottom: 0,
    },
    bot: {
      backgroundColor: botConfigs.colors.secondary,
      alignSelf: 'flex-start',
      borderBottomEndRadius: 16,
      borderBottomStartRadius: 4,
      marginLeft: 16,
    },
    user: {
      backgroundColor: botConfigs.colors.main,
      alignSelf: 'flex-end',
      marginRight: 16,
      borderBottomEndRadius: 4,
      borderBottomStartRadius: 16,
    },
  });

  const MessageWrapper = (props: Message) => {
    const ballonStyle = props.from === From.BOT ? styles.bot : styles.user;

    return (
      <View style={[styles.container, ballonStyle]}>
        <MessageComponent {...(props as Message)} />
        {props.type !== MessageTypes.TYPING && <MessageHour msg={props} />}
      </View>
    );
  };

  return MessageWrapper;
};
