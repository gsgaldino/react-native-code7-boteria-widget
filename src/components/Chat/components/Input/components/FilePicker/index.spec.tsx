import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilePicker, { getMessageType } from '.';
import { MessageTypes, From } from '../../../../../../types';
import DocumentPicker from 'react-native-document-picker';

jest.mock('react-native-document-picker');
jest.mock('../../../../../../utils/toBase64');

jest.mock('react-native-fs', () => ({
  readFile: jest.fn(),
}));

describe('FilePicker', () => {
  const sendMessage = jest.fn();
  afterEach(() => jest.clearAllMocks());

  it('calls DocumentPicker.pick when filePicker is pressed', async () => {
    const pickSpy = jest.spyOn(DocumentPicker, 'pick');
    const { getByTestId } = render(<FilePicker sendMessage={sendMessage} />);
    const filePicker = getByTestId('filePicker');
    fireEvent.press(filePicker);
    expect(pickSpy).toHaveBeenCalled();
  });

  it('handles document selection correctly and adds message', async () => {
    const mockResponse = [
      {
        uri: 'file1_uri',
        type: 'application/pdf',
        name: 'file1.pdf',
        size: 1234,
        message: 'data:application/pdf;base64,undefined',
      },
      {
        uri: 'file2_uri',
        name: 'file2.jpg',
        size: 5678,
        type: 'image/jpeg',
        localFileUri: 'file2.jpg',
        message: 'data:image/jpeg;base64,undefined',
      },
    ];
    (DocumentPicker.pick as jest.Mock).mockResolvedValue(mockResponse);
    const { getByTestId } = render(<FilePicker sendMessage={sendMessage} />);
    const filePicker = getByTestId('filePicker');
    await fireEvent.press(filePicker);
    const expectedMessages = mockResponse.map((file) => {
      const [type, ext] = file.type.split('/');
      const messageType = getMessageType(type as string);
      const expectedMsg: any = {
        id: undefined,
        ext,
        from: From.USER,
        isMedia: true,
        type: messageType,
        message: file.message,
        localFileUri: file.uri,
      };
      if (
        messageType === MessageTypes.DOCUMENT ||
        messageType === MessageTypes.VIDEO
      ) {
        expectedMsg.document = {
          fileUrl: file.uri,
          size: file.size,
          title: file.name,
        };
      }
      return expectedMsg;
    });
    expect(sendMessage).toHaveBeenCalledWith(expectedMessages[0]);
    expect(sendMessage).toHaveBeenCalledWith(expectedMessages[1]);
    expect(DocumentPicker.pick).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledTimes(mockResponse.length);
  });

  it('does not add a message when document picker is canceled', async () => {
    (DocumentPicker.isCancel as jest.Mock).mockReturnValue(true);
    const { getByTestId } = render(<FilePicker sendMessage={sendMessage} />);
    const filePicker = getByTestId('filePicker');
    fireEvent.press(filePicker);
    expect(sendMessage).not.toHaveBeenCalled();
  });
});
