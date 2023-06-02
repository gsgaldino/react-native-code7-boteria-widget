import React, { useMemo, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Document, From } from '../../../../../../types/message';
import { getFileNameFromAttachment } from '../../../../../../utils/getFilenameFromAttachment';
import RNFS from 'react-native-fs';
import type { IMessageComponentProps } from '../MessageComponent';

import attachIcon from '../../../../../../assets/attach_icon.png';

const DocumentComponent: React.FC<IMessageComponentProps> = (props) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const fileName = useMemo(
    () => getFileNameFromAttachment(props.message.document as Document),
    [props.message.document]
  );

  const downloadDocumentToDevice = async () => {
    setIsDownloading(true);

    try {
      const destination = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      const job = RNFS.downloadFile({
        fromUrl: props.message.document?.fileUrl as string,
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
      color: props?.settings?.secondaryTextColor,
    },
    user: {
      color: props?.settings?.mainTextColor,
    },
    container: {
      flexDirection: 'row',
    },
    text: {
      marginLeft: 8,
    },
  });

  const textColor = props.message.from === From.BOT ? styles.bot : styles.user;

  return (
    <TouchableOpacity onPress={onDocumentPress} style={styles.container}>
      {isDownloading ? <ActivityIndicator /> : <Image source={attachIcon} />}

      <Text style={[styles.text, textColor]}>{fileName}</Text>
    </TouchableOpacity>
  );
};

export default DocumentComponent;
