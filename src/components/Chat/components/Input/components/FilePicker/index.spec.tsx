import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilePicker from '.';
import { MessageTypes, From, Message } from '../../../../../../types';
import type { DocumentPicker } from '../../../../../../infra/interfaces/DocumentPicker';
import { Alert } from 'react-native';

describe('FilePicker', () => {
  const sendMessage = jest.fn();

  afterEach(() => jest.clearAllMocks());

  it('calls documentPicker.pick when filePicker is pressed', async () => {
    const documentPicker: DocumentPicker = {
      pick: jest.fn().mockResolvedValue(null),
    };
    const { getByTestId } = render(
      <FilePicker documentPicker={documentPicker} sendMessage={sendMessage} />
    );
    const filePicker = getByTestId('filePicker');
    fireEvent.press(filePicker);
    expect(documentPicker.pick).toHaveBeenCalled();
  });

  it('handles document selection correctly and adds message', async () => {
    const mockMessage: Message = {
      id: 'messageId',
      ext: 'pdf',
      from: From.USER,
      isMedia: true,
      type: MessageTypes.DOCUMENT,
      message: 'data:application/pdf;base64,undefined',
      localFileUri: 'file1_uri',
      document: {
        fileUrl: 'file1_uri',
        size: 1234,
        title: 'file1.pdf',
      },
    };
    const documentPicker: DocumentPicker = {
      pick: jest.fn().mockResolvedValue(mockMessage),
    };
    const { getByTestId } = render(
      <FilePicker documentPicker={documentPicker} sendMessage={sendMessage} />
    );
    const filePicker = getByTestId('filePicker');
    await fireEvent.press(filePicker);
    expect(sendMessage).toHaveBeenCalledWith(mockMessage);
  });

  it('does not add a message when document picker returns null', async () => {
    const documentPicker: DocumentPicker = {
      pick: jest.fn().mockResolvedValue(null),
    };
    const { getByTestId } = render(
      <FilePicker documentPicker={documentPicker} sendMessage={sendMessage} />
    );
    const filePicker = getByTestId('filePicker');
    await fireEvent.press(filePicker);
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('does not add a message when document size is greater than 14mb', async () => {
    const mockAlert = jest.spyOn(Alert, 'alert');

    const expectMessage = 'Tamanho de mídia';

    const documentPicker: DocumentPicker = {
      pick: jest.fn().mockRejectedValueOnce(new Error(expectMessage)),
    };
    const { getByTestId } = render(
      <FilePicker documentPicker={documentPicker} sendMessage={sendMessage} />
    );

    const filePicker = getByTestId('filePicker');
    await fireEvent.press(filePicker);
    expect(mockAlert).toHaveBeenCalledWith(
      expectMessage,
      'Sua mídia ultrapassa o tamanho permitido de 14mb para envio'
    );
  });
});
