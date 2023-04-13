import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilePicker from '.';
import { useSocketActions } from '../../../../../../hooks';
import DocumentPicker from 'react-native-document-picker';

jest.mock('react-native-document-picker');

jest.mock('../../../../../../hooks', () => ({
  useSocketActions: jest.fn(() => ({
    handleSubmitMessage: jest.fn(),
  })),
}));

describe('FilePicker', () => {
  beforeAll(() => {
    (useSocketActions as jest.Mock).mockReturnValue({
      handleSubmitMessage: jest.fn(),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call DocumentPicker and handleSubmitMessage when a document is selected', async () => {
    const document = {
      uri: 'file://path/to/file.pdf',
      type: 'application/pdf',
      name: 'file.pdf',
      size: 1024,
    };
    (DocumentPicker.pick as jest.Mock).mockResolvedValueOnce([document]);

    const { getByTestId } = render(<FilePicker />);
    const filePickerButton = getByTestId('filePicker');

    await fireEvent.press(filePickerButton);

    expect(DocumentPicker.pick).toHaveBeenCalled();
    expect(useSocketActions().handleSubmitMessage).toHaveBeenCalled();
  });
});
