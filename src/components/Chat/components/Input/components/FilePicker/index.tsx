import React, { useCallback } from 'react';
import { TouchableOpacity, Image } from 'react-native';

import DocumentPicker from 'react-native-document-picker';
import type { DocumentPickerResponse } from 'react-native-document-picker';

import attachIcon from '../../../../../../assets/attach_icon.png';

import { styles } from './styles';

type OnFileSelect = (files: DocumentPickerResponse[]) => void;

const FilePicker = ({ onSelect }: { onSelect: OnFileSelect }) => {
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
      });

      if (response) onSelect(response);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) return;

      console.warn(err);
    }
  }, []);

  return (
    <TouchableOpacity onPress={handleDocumentSelection}>
      <Image source={attachIcon} style={styles.attachIcon} />
    </TouchableOpacity>
  );
};

export default FilePicker;
