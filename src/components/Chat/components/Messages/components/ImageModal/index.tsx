import React, { memo } from 'react';
import { Image, View, TouchableWithoutFeedback, Text } from 'react-native';

import { styles } from './styles';

export interface IImageModalProps {
  imageUri: String;
  setModalIsOpen: (isClose: boolean) => void;
}

const ImageModal = ({ imageUri, setModalIsOpen }: IImageModalProps) => {
  return (
    <View style={[styles.overlayText]}>
      <TouchableWithoutFeedback onPress={() => setModalIsOpen(false)}>
        <Text style={[styles.buttonCloseModal]}>X</Text>
      </TouchableWithoutFeedback>
      <Image
        source={{
          uri: imageUri as string,
        }}
        resizeMode="contain"
        style={[styles.modal]}
      />
    </View>
  );
};

export default memo(ImageModal);
