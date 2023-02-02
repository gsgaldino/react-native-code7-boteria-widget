import React, { useState, useCallback } from 'react';
import { TextInput, View, TouchableOpacity, Image } from 'react-native';

import {
  MessageTypes,
  From,
  Message,
  Document,
} from '../../../../types/Message';
import FilePicker from './components/FilePicker';

import { useSocketContext } from '../../../../context/Socket/Component';

import sendIcon from '../../../../assets/send_icon.png';

import type { DocumentPickerResponse } from 'react-native-document-picker';

import { toBase64 } from './utils/toBase64';

import { styles } from './styles';

const ONE_THOUSAND = 1000;

function Input() {
  const { handleSubmitMessage } = useSocketContext();
  const [userText, setUserText] = useState('');

  const getMessageType = (type: string) => {
    switch (type) {
      case 'application':
      case 'msword':
      case 'text':
        return MessageTypes.DOCUMENT;

      case 'video':
        return MessageTypes.VIDEO;

      case 'image':
        return MessageTypes.IMAGE;

      default:
        return MessageTypes.IMAGE;
    }
  };

  const onAttach = useCallback(async (files: DocumentPickerResponse[]) => {
    files.forEach(async (file) => {
      const [type, ext] = (file?.type as string)?.split('/');
      const messageType = getMessageType(type as string);
      const base64String = await toBase64(file?.uri);

      const msg: Message = {
        ext,
        from: From.USER,
        isMedia: true,
        type: messageType,
        message: `data:${file?.type};base64,${base64String}`,
        localFileUri: file?.uri,
      };

      if ([MessageTypes.DOCUMENT, MessageTypes.VIDEO].includes(messageType)) {
        msg.document = {
          fileUrl: file?.uri,
          size: file?.size,
          title: file?.name,
        } as Document;
      }

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
        <FilePicker onSelect={onAttach} />

        <TouchableOpacity onPress={onSend}>
          <Image source={sendIcon} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Input;
