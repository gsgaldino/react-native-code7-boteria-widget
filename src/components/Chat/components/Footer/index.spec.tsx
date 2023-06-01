import React from 'react';
import { Linking } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Footer, IFooterProps } from '.';

const footerProps: IFooterProps = {
  poweredBy: 'Mock powered by',
  poweredByUrl: 'https://mock.powered.com',
};

describe('Footer component', () => {
  it('renders text when poweredBy is present in botConfigs', () => {
    const { getByText } = render(<Footer {...footerProps} />);
    const textElement = getByText(footerProps.poweredBy);
    expect(textElement).toBeDefined();
  });

  it('calls Linking.openURL with poweredByUrl when text is pressed', () => {
    const { getByTestId } = render(<Footer {...footerProps} />);
    const textElement = getByTestId('poweredBy');
    const mockOpenURL = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(async () => {});
    fireEvent.press(textElement);
    expect(mockOpenURL).toHaveBeenCalledWith(footerProps.poweredByUrl);
  });
});
