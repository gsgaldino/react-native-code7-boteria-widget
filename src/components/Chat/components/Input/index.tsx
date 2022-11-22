import React, { useState, useCallback } from 'react';
import { TextInput, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { MessageTypes } from '../../../../types/Message';
import { useMessages } from '../../../../context/Messages';

import attachIcon from '../../../../assets/attach_icon.png';
import sendIcon from '../../../../assets/send_icon.png';

import { styles } from './styles';

function Input() {
  const { handleSubmitMessage } = useMessages();
  const [userText, setUserText] = useState('');
  const [, setImage] = useState<null | ImagePicker.ImagePickerResult>(null);

  const onAttach = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    setImage(result);
  }, []);

  const onSend = () => {
    if (!userText) return;
    else {
      handleSubmitMessage({
        type: MessageTypes.TEXT,
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
