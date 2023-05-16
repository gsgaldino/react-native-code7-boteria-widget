import React from 'react';
import { Linking } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { useChatConfigurations } from '../../../../context/ChatConfigurationsContext';
import Footer from '.';

jest.mock('../../../../context/ChatConfigurationsContext');
const mockBotConfig = {
  chatConfigurations: {
    poweredBy: 'Mock powered by',
    poweredByUrl: 'https://mock.powered.com',
  },
};

describe('<Footer />', () => {
  it('renders text when poweredBy is present in botConfigs', () => {
    (useChatConfigurations as jest.Mock).mockReturnValueOnce(mockBotConfig);
    const { getByText } = render(<Footer />);
    const textElement = getByText(mockBotConfig.chatConfigurations.poweredBy);
    expect(textElement).toBeDefined();
  });

  it('does not render text when poweredBy is not present in botConfigs', () => {
    (useChatConfigurations as jest.Mock).mockReturnValueOnce({
      botConfigs: {},
    });
    const { queryByText } = render(<Footer />);
    const textElement = queryByText(mockBotConfig.chatConfigurations.poweredBy);
    expect(textElement).toBeNull();
  });

  it('calls Linking.openURL with poweredByUrl when text is pressed', () => {
    (useChatConfigurations as jest.Mock).mockReturnValueOnce(mockBotConfig);

    const { getByTestId } = render(<Footer />);
    const textElement = getByTestId('poweredBy');
    const mockOpenURL = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(async () => {});

    fireEvent.press(textElement);

    expect(mockOpenURL).toHaveBeenCalledWith(
      mockBotConfig.chatConfigurations.poweredByUrl
    );

    mockOpenURL.mockRestore();
  });
});
