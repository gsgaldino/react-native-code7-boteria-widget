import React, { memo } from 'react';
import { Message, Document } from 'types/Message';
import { Text, Image, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';

import { getFileNameFromAttachment } from '../../../../../../../../utils/getFilenameFromAttachment';
import { useChatConfigurations } from '../../../../../../../../context/ChatConfigurations';
import attachIcon from '../../../../../../../../assets/attach_icon.png';
import { saveAndroidFile } from '../../../../../../../../utils/save';

import { styles } from './styles';

const DocumentComponent: React.FC<Message> = (msg) => {
  const { botConfigs } = useChatConfigurations();

  const fileUrl = msg.document as Document;
  const fileName = getFileNameFromAttachment(fileUrl);

  const downloadFile = () => {
    const uri = fileUrl.fileUrl;
    let fileUri = FileSystem.documentDirectory as string;
    FileSystem.downloadAsync(uri, fileUri)
      .then((downloaded) => {
        saveAndroidFile({
          fileName,
          fileUri: downloaded.uri,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={downloadFile}>
      <Image source={attachIcon} style={styles.image} />
      <Text
        style={{
          color: botConfigs.colors.secondaryText,
        }}
      >
        {fileName}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(DocumentComponent);
