import React from 'react';
import { TouchableOpacity, Image, Alert } from 'react-native';

import type { Message } from '../../../../../../types';
import { styles } from './styles';

import attachIcon from '../../../../../../assets/attach_icon.png';
import type { DocumentPicker } from '../../../../../../infra/interfaces/DocumentPicker';

interface IFilePickerProps {
  sendMessage: (msg: Message) => void;
  documentPicker: DocumentPicker;
}

const FilePicker = ({ sendMessage, documentPicker }: IFilePickerProps) => {
  const handleDocumentSelection = async () => {
    try {
      const message = await documentPicker.pick();

      if (message) sendMessage(message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert(
          error.message,
          'Sua mídia ultrapassa o tamanho permitido de 14mb para envio'
        );
      }
    }
  };

  return (
    <TouchableOpacity testID="filePicker" onPress={handleDocumentSelection}>
      <Image source={attachIcon} style={styles.attachIcon} />
    </TouchableOpacity>
  );
};

export default FilePicker;
