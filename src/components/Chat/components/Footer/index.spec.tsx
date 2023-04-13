import React from 'react';
import { Linking } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { useChatConfigurations } from '../../../../context/ChatConfigurations';
import Footer from '.';

jest.mock('../../../../context/ChatConfigurations');
const mockBotConfig = {
  botConfigs: {
    poweredBy: 'Mock powered by',
    poweredByUrl: 'https://mock.powered.com',
  },
};

describe('Footer component', () => {
  it('renders text when poweredBy is present in botConfigs', () => {
    (useChatConfigurations as jest.Mock).mockReturnValueOnce(mockBotConfig);
    const { getByText } = render(<Footer />);
    const textElement = getByText(mockBotConfig.botConfigs.poweredBy);
    expect(textElement).toBeDefined();
  });

  it('does not render text when poweredBy is not present in botConfigs', () => {
    (useChatConfigurations as jest.Mock).mockReturnValueOnce({
      botConfigs: {},
    });
    const { queryByText } = render(<Footer />);
    const textElement = queryByText(mockBotConfig.botConfigs.poweredBy);
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
      mockBotConfig.botConfigs.poweredByUrl
    );

    mockOpenURL.mockRestore();
  });
});
