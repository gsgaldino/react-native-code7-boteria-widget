import React, { useState, useCallback } from 'react';
import { TextInput, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { MessageTypes, From, Message } from '../../../../types/Message';

import { useSocketContext } from '../../../../context/Socket/Component';
import attachIcon from '../../../../assets/attach_icon.png';
import SendIcon from '../../../../assets/icons/SendIcon';

import { styles } from './styles';

const ONE_THOUSAND = 1000;

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
        maxLength={ONE_THOUSAND}
      />

      <View style={styles.icons}>
        <TouchableOpacity onPress={onAttach}>
          <Image source={attachIcon} style={styles.attachIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onSend}>
          <SendIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Input;
