import React, { useMemo } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

import { Document, From } from '../../../../../../types/message';
import { getFileNameFromAttachment } from '../../../../../../utils/getFilenameFromAttachment';
import type { IMessageComponentProps } from '../MessageComponent';

import attachIcon from '../../../../../../assets/attach_icon.png';

const DocumentComponent: React.FC<IMessageComponentProps> = (props) => {
  const fileName = useMemo(
    () => getFileNameFromAttachment(props.message.document as Document),
    [props.message.document]
  );

  const onDocumentPress = () => {
    if (props.message.from === From.USER) return;
    return Linking.openURL(props.message.document?.fileUrl as string);
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
      <Image source={attachIcon} />
      <Text style={[styles.text, textColor]}>{fileName}</Text>
    </TouchableOpacity>
  );
};

export default DocumentComponent;
