import React, { useState, useCallback } from 'react';
import { TextInput, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { messageTypes } from '../../../../constants/messageTypes';
import { useMessages } from '../../../../context/Messages';

import attachIcon from '../../../../assets/attach_icon.png';
import sendIcon from '../../../../assets/send_icon.png';
import { styles } from './styles';

function Input() {
  const { handleSubmitMessage } = useMessages();
  const [userText, setUserText] = useState('');
  const [, setImage] = useState<any>();

  const onAttach = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log('RESULT', result.assets[0]);
      setImage(result?.assets[0]?.uri);
    }
  }, []);

  const onSend = () => {
    if (!userText) return;
    else {
      handleSubmitMessage({
        type: messageTypes.TEXT,
        message: userText,
      });
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
          <Image source={sendIcon} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Input;
