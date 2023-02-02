import React, { useMemo, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Message, Document, From } from '../../../../../../types/Message';
import { getFileNameFromAttachment } from '../../../../../../utils/getFilenameFromAttachment';
import RNFS from 'react-native-fs';

import attachIcon from '../../../../../../assets/attach_icon.png';
import { useChatConfigurations } from '../../../../../../context/ChatConfigurations';

const DocumentComponent: React.FC<Message> = (msg) => {
  const { botConfigs } = useChatConfigurations();

  const [isDownloading, setIsDownloading] = useState(false);

  const fileName = useMemo(
    () => getFileNameFromAttachment(msg.document as Document),
    [msg.document]
  );

  const downloadDocumentToDevice = async () => {
    setIsDownloading(true);

    try {
      const destination = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      const job = RNFS.downloadFile({
        fromUrl: msg.document?.fileUrl as string,
        toFile: destination,
      });

      await job.promise;
    } catch (error) {
      throw error;
    } finally {
      setIsDownloading(false);
    }
  };

  const onDocumentPress = () => {
    downloadDocumentToDevice();
  };

  const styles = StyleSheet.create({
    bot: {
      color: botConfigs.colors.secondaryText,
    },
    user: {
      color: botConfigs.colors.mainText,
    },
    container: {
      flexDirection: 'row',
    },
    text: {
      marginLeft: 8,
    },
  });

  const textColor = msg.from === From.BOT ? styles.bot : styles.user;

  return (
    <TouchableOpacity onPress={onDocumentPress} style={styles.container}>
      {isDownloading ? <ActivityIndicator /> : <Image source={attachIcon} />}

      <Text style={[styles.text, textColor]}>{fileName}</Text>
    </TouchableOpacity>
  );
};

export default DocumentComponent;
