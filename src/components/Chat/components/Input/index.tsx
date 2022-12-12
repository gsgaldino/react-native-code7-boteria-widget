import React, { useState, useCallback } from 'react';
import { TextInput, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { MessageTypes, From, Message } from 'src/types/Message';

import { useSocketContext } from 'src/context/Socket/Component';
import attachIcon from 'src/assets/attach_icon.png';
// import sendIcon from 'src/assets/send_icon.png';
import SendIcon from 'src/assets/icons/SendIcon';

import { styles } from './styles';

function Input() {
  const { handleSubmitMessage } = useSocketContext();
  const [userText, setUserText] = useState('');

  const onAttach = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    const uri = result.assets ? result.assets[0]?.uri : '';

    const msg: Message = {
      from: From.USER,
      ext: 'jpg',
      isMedia: true,
      type: MessageTypes.IMAGE,
      message: uri,
    };

    handleSubmitMessage(msg);
  }, []);

  const onSend = () => {
    if (!userText) return;
    else {
      const msg: Message = {
        type: MessageTypes.TEXT,
        message: userText,
        from: From.USER,
      };
      handleSubmitMessage(msg);
      setUserText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite algo ..."
        placeholderTextColor="#979AA5"
        onChangeText={setUserText}
        style={styles.input}
        value={userText}
      />

      <View style={styles.icons}>
        <TouchableOpacity onPress={onAttach}>
          <Image source={attachIcon} style={styles.attachIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onSend}>
          {/* <Image source={sendIcon} style={styles.sendIcon} /> */}
          <SendIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Input;
