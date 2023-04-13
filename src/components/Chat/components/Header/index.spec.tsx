import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '.';
import { useChatConfigurations } from '../../../../context/ChatConfigurations';
import { useStorage } from '../../../../context/Storage/Component';
import { useSocketActions, useEncryptedStorage } from '../../../../hooks';

jest.mock('../../../../context/ChatConfigurations');
jest.mock('../../../../context/Storage/Component');
jest.mock('../../../../hooks');

describe('Header component', () => {
  beforeAll(() => {
    (useChatConfigurations as jest.Mock).mockReturnValue({
      isChatOpen: true,
      toggleIsChatOpen: jest.fn(),
      botConfigs: {
        title: 'Bot title',
        colors: {
          main: '#000000',
        },
      },
    });

    (useStorage as jest.Mock).mockReturnValue({
      resetMessages: jest.fn(),
    });

    (useEncryptedStorage as jest.Mock).mockReturnValue({
      clear: jest.fn(),
    });

    (useSocketActions as jest.Mock).mockReturnValue({
      subscribe: jest.fn(),
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders the component with the correct title', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Bot title')).toBeDefined();
  });

  it('calls onRestartConversation when reset icon is pressed', async () => {
    const { getByTestId } = render(<Header />);
    const restartConversationButton = getByTestId('restartConversation');
    fireEvent.press(restartConversationButton);

    expect(useStorage().resetMessages).toHaveBeenCalledTimes(1);
    expect(useEncryptedStorage().clear).toHaveBeenCalledTimes(1);
    expect(useSocketActions().subscribe).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close icon is pressed', () => {
    const { getByTestId } = render(<Header />);
    const closeElement = getByTestId('closeChat');
    fireEvent.press(closeElement);
    expect(useChatConfigurations().toggleIsChatOpen).toHaveBeenCalledTimes(1);
  });
});
