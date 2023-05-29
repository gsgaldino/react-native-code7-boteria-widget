import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Image } from 'react-native';

import { MessageTypes, From, Message } from '../../../../types';
// import FilePicker from './components/FilePicker';

import sendIcon from '../../../../assets/send_icon.png';
import { styles } from './styles';

const ONE_THOUSAND = 1000;

export const Input = ({
  sendMessage,
}: {
  sendMessage: (msg: Message) => void;
}) => {
  const [userText, setUserText] = useState('');

  const onSend = () => {
    if (!userText) return;
    const msg: Message = {
      type: MessageTypes.TEXT,
      message: userText,
      from: From.USER,
    };
    sendMessage(msg);
    setUserText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite algo ..."
        placeholderTextColor="#979AA5"
        onChangeText={setUserText}
        style={styles.input}
        value={userText}
        maxLength={ONE_THOUSAND}
      />

      <View style={styles.icons}>
        {/* <FilePicker /> */}

        <TouchableOpacity testID="sendIcon" onPress={onSend}>
          <Image source={sendIcon} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
