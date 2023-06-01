import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Header, IHeaderProps } from '.';

const headerProps: IHeaderProps = {
  close: jest.fn(),
  restartConversation: jest.fn(),
  title: 'Bot title',
  mainColor: '#FF0000',
};

describe('Header component', () => {
  afterEach(() => jest.clearAllMocks());

  it('renders the component with the correct title', () => {
    const { getByText } = render(<Header {...headerProps} />);
    expect(getByText(headerProps.title)).toBeDefined();
  });

  it('calls onClose when close button is clicked', () => {
    const { getByTestId } = render(<Header {...headerProps} />);
    const closeButton = getByTestId('closeChat');
    fireEvent.press(closeButton);
    expect(headerProps.close).toHaveBeenCalled();
  });

  it('calls onRestartConversation when restart button is clicked', () => {
    const { getByTestId } = render(<Header {...headerProps} />);
    const restartButton = getByTestId('restartConversation');
    fireEvent.press(restartButton);
    expect(headerProps.restartConversation).toHaveBeenCalled();
  });
});
