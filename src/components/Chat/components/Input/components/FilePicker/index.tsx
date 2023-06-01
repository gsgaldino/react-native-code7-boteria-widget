import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import DocumentPicker from 'react-native-document-picker';

import { toBase64 } from '../../../../../../utils';
import { MessageTypes, From, Message, Document } from '../../../../../../types';
import { styles } from './styles';

import attachIcon from '../../../../../../assets/attach_icon.png';

export const getMessageType = (type: string) => {
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

const FilePicker = ({
  sendMessage,
}: {
  sendMessage: (msg: Message) => void;
}) => {
  const handleSubmitMessage = (msg: Message) => {
    sendMessage(msg);
  };

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
      });

      if (response) {
        await Promise.all(
          response.map(async (file: any) => {
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

            if (
              [MessageTypes.DOCUMENT, MessageTypes.VIDEO].includes(messageType)
            ) {
              msg.document = {
                fileUrl: file?.uri,
                size: file?.size,
                title: file?.name,
              } as unknown as Document;
            }

            return handleSubmitMessage(msg);
          })
        );
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) return;
      throw err;
    }
  };

  return (
    <TouchableOpacity testID="filePicker" onPress={handleDocumentSelection}>
      <Image source={attachIcon} style={styles.attachIcon} />
    </TouchableOpacity>
  );
};

export default FilePicker;
