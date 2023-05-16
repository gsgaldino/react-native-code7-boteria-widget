import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '.';
import { initialConfigs } from '../../../../constants';
import { useChatConfigurations } from '../../../../context/ChatConfigurationsContext';
import { useMessageList } from '../../../../context/MessageListContext';
import { useSession } from '../../../../context/SessionContext';
import { ChatConfigurations } from '../../../../entities/ChatConfigurations';
import { Session } from '../../../../entities/Session';
import { MessageList } from '../../../../entities/MessageList';

jest.mock('../../../../context/ChatConfigurationsContext');
jest.mock('../../../../context/SessionContext');
jest.mock('../../../../context/MessageListContext');

describe('Header component', () => {
  beforeAll(() => {
    (useChatConfigurations as jest.Mock).mockReturnValue({
      chatConfigurations: new ChatConfigurations(
        initialConfigs.title,
        initialConfigs.poweredBy,
        initialConfigs.poweredByUrl,
        initialConfigs.settings,
        false
      ),
      updateState: () => {},
    });
    (useMessageList as jest.Mock).mockReturnValue({
      messageList: new MessageList([]),
    });
    (useSession as jest.Mock).mockReturnValue({
      session: new Session(''),
    });
  });

  it('renders the component with the correct title', () => {
    const { getByText } = render(<Header />);
    expect(getByText(initialConfigs.title)).toBeDefined();
  });

  it('calls onClose when close button is clicked', () => {
    const closeSpy = jest.spyOn(
      useChatConfigurations().chatConfigurations,
      'close'
    );

    const { getByTestId } = render(<Header />);
    const closeButton = getByTestId('closeChat');

    fireEvent.press(closeButton);

    expect(closeSpy).toHaveBeenCalled();
  });

  it('calls onRestartConversation when restart button is clicked', () => {
    const clearMessagesSpy = jest.spyOn(
      useMessageList().messageList,
      'clearMessages'
    );
    const clearSessionSpy = jest.spyOn(useSession().session, 'clearSession');

    const { getByTestId } = render(<Header />);
    const restartButton = getByTestId('restartConversation');

    fireEvent.press(restartButton);

    expect(clearMessagesSpy).toHaveBeenCalled();
    expect(clearSessionSpy).toHaveBeenCalled();
  });
});
