import React, { useState, useCallback } from 'react';
import { TextInput, View, TouchableOpacity, Image } from 'react-native';

import { MessageTypes, From, Message } from '../../../../types/Message';

import { useSocketContext } from '../../../../context/Socket/Component';
import attachIcon from '../../../../assets/attach_icon.png';
import sendIcon from '../../../../assets/send_icon.png';

import { launchImageLibrary } from 'react-native-image-picker';

import { styles } from './styles';

const ONE_THOUSAND = 1000;

function Input() {
  const { handleSubmitMessage } = useSocketContext();
  const [userText, setUserText] = useState('');

  const onAttach = useCallback(async () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      const uri = response.assets ? response.assets[0]?.uri : '';
      const ext = response.assets
        ? response.assets[0]?.type?.split('/')[1]
        : '';

      const msg: Message = {
        from: From.USER,
        ext,
        isMedia: true,
        type: MessageTypes.IMAGE,
        message: uri,
      };

      handleSubmitMessage(msg);
    });
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
          <Image source={sendIcon} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Input;
