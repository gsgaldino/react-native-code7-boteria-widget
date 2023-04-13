import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Input from '.';
import { useSocketActions } from '../../../../hooks';

jest.mock('../../../../hooks', () => ({
  useSocketActions: jest.fn(),
}));

describe('Input component', () => {
  beforeAll(() => {
    (useSocketActions as jest.Mock).mockReturnValue({
      handleSubmitMessage: jest.fn(),
    });

    jest.clearAllMocks();
  });

  it('renders the component with input and icons', () => {
    const { getByPlaceholderText, getByTestId } = render(<Input />);
    const inputElement = getByPlaceholderText('Digite algo ...');
    const filePickerElement = getByTestId('filePicker');
    const sendIconElement = getByTestId('sendIcon');

    expect(inputElement).toBeDefined();
    expect(filePickerElement).toBeDefined();
    expect(sendIconElement).toBeDefined();
  });

  it('handles user input correctly', () => {
    const { getByPlaceholderText } = render(<Input />);
    const inputElement = getByPlaceholderText('Digite algo ...');
    const expectedMessage = 'test message';

    fireEvent.changeText(inputElement, expectedMessage);
    expect(inputElement.props.value).toBe(expectedMessage);
  });

  it('handles sending text messages correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(<Input />);
    const inputElement = getByPlaceholderText('Digite algo ...');
    const sendIconElement = getByTestId('sendIcon');
    const expectedMessage = 'test message';

    fireEvent.changeText(inputElement, expectedMessage);
    fireEvent.press(sendIconElement);

    expect(useSocketActions().handleSubmitMessage).toHaveBeenCalledWith({
      from: 'user',
      message: expectedMessage,
      type: 'TEXT',
    });
    expect(inputElement.props.value).toBe('');
  });

  it('does not send empty messages', () => {
    const { getByTestId } = render(<Input />);
    const sendIconElement = getByTestId('sendIcon');

    fireEvent.press(sendIconElement);

    expect(useSocketActions().handleSubmitMessage).not.toHaveBeenCalled();
  });
});
