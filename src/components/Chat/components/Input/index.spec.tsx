import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '.';
import { From, MessageTypes } from '../../../../types';

jest.mock('react-native-fs', () => ({
  readFile: jest.fn(),
}));

describe('Input', () => {
  it('renders input field with correct placeholder', () => {
    const { getByPlaceholderText } = render(<Input sendMessage={() => {}} />);
    const inputField = getByPlaceholderText('Digite algo ...');
    expect(inputField).toBeTruthy();
  });

  it('calls addMessage when send button is pressed', () => {
    const sendMessage = jest.fn();
    const expectedMessage = 'Hello, world!';
    const { getByTestId } = render(<Input sendMessage={sendMessage} />);
    const sendButton = getByTestId('sendIcon');
    const inputField = getByTestId('messageInput');
    fireEvent.changeText(inputField, expectedMessage);
    fireEvent.press(sendButton);
    const expectedMsgObject = {
      message: expectedMessage,
      id: undefined,
      from: From.USER,
      type: MessageTypes.TEXT,
    };
    expect(sendMessage).toHaveBeenCalledWith(expectedMsgObject);
    expect(inputField.props.value).toBe('');
  });

  it('does not send empty messages', () => {
    const sendMessage = jest.fn();
    const { getByTestId } = render(<Input sendMessage={sendMessage} />);
    const sendIconElement = getByTestId('sendIcon');
    fireEvent.press(sendIconElement);
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('handles user input correctly', () => {
    const { getByTestId } = render(<Input sendMessage={() => {}} />);
    const inputElement = getByTestId('messageInput');
    const expectedMessage = 'test message';
    fireEvent.changeText(inputElement, expectedMessage);
    expect(inputElement.props.value).toBe(expectedMessage);
  });
});
