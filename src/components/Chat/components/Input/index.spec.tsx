import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Input from '.';
import { From, MessageTypes } from '../../../../types';
import { useMessageList } from '../../../../context/MessageListContext';
import { useUuid } from '../../../../context/UuidContext';

import { MessageList } from '../../../../entities/MessageList';

jest.mock('../../../../context/MessageListContext');
jest.mock('../../../../context/UuidContext');

describe('Input', () => {
  beforeAll(() => {
    (useMessageList as jest.Mock).mockReturnValue({
      messageList: new MessageList([]),
    });
    (useUuid as jest.Mock).mockReturnValue({
      uuid: { generate: jest.fn() },
    });
  });

  it('renders input field with correct placeholder', () => {
    const { getByPlaceholderText } = render(<Input />);
    const inputField = getByPlaceholderText('Digite algo ...');
    expect(inputField).toBeTruthy();
  });

  it('calls addMessage when send button is pressed', () => {
    const uuidSpy = jest.spyOn(useUuid().uuid, 'generate');
    const addMessageSpy = jest.spyOn(
      useMessageList().messageList,
      'addMessage'
    );
    const expectedMessage = 'Hello, world!';

    const { getByTestId, getByPlaceholderText } = render(<Input />);
    const sendButton = getByTestId('sendIcon');

    const inputField = getByPlaceholderText('Digite algo ...');

    fireEvent.changeText(inputField, expectedMessage);
    fireEvent.press(sendButton);

    const expectedMsgObject = {
      message: expectedMessage,
      id: undefined,
      from: From.USER,
      type: MessageTypes.TEXT,
    };

    expect(uuidSpy).toHaveBeenCalled();
    expect(addMessageSpy).toHaveBeenCalledWith(expectedMsgObject);
    expect(inputField.props.value).toBe('');
  });

  it('does not send empty messages', () => {
    const uuidSpy = jest.spyOn(useUuid().uuid, 'generate');
    const addMessageSpy = jest.spyOn(
      useMessageList().messageList,
      'addMessage'
    );

    const { getByTestId } = render(<Input />);
    const sendIconElement = getByTestId('sendIcon');

    fireEvent.press(sendIconElement);

    expect(uuidSpy).not.toHaveBeenCalled();
    expect(addMessageSpy).not.toHaveBeenCalled();
  });

  it('handles user input correctly', () => {
    const { getByPlaceholderText } = render(<Input />);
    const inputElement = getByPlaceholderText('Digite algo ...');
    const expectedMessage = 'test message';
    fireEvent.changeText(inputElement, expectedMessage);
    expect(inputElement.props.value).toBe(expectedMessage);
  });
});
