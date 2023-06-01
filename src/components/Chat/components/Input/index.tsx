import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { MessageTypes, From, Message } from '../../../../types';

import FilePicker from './components/FilePicker';
import sendIcon from '../../../../assets/send_icon.png';

import { styles } from './styles';
const ONE_THOUSAND = 1000;

export const Input = ({
  sendMessage,
}: {
  sendMessage: (msg: Message) => void;
}) => {
  const [message, setMessage] = useState('');

  const onSend = () => {
    if (!message) return;
    const msg: Message = {
      type: MessageTypes.TEXT,
      message: message,
      from: From.USER,
    };
    sendMessage(msg);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Digite algo ..."
        placeholderTextColor="#979AA5"
        maxLength={ONE_THOUSAND}
        testID="messageInput"
      />

      <FilePicker sendMessage={sendMessage} />
      <TouchableOpacity onPress={onSend} testID="sendIcon">
        <Image source={sendIcon} resizeMode="contain" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};
