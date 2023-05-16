import { ChatConfigurations } from './ChatConfigurations';
import { initialConfigs } from '../constants/initialChatConfigurations';

const configurations = new ChatConfigurations(
  initialConfigs.title,
  initialConfigs.poweredBy,
  initialConfigs.poweredByUrl,
  initialConfigs.settings
);

describe('ChatConfigurations test suite', () => {
  it('should create configurations object with initial data', () => {
    expect(configurations.isOpen).toBeFalsy();
    expect(configurations.title).toBe(initialConfigs.title);
    expect(configurations.poweredBy).toBe(initialConfigs.poweredBy);
    expect(configurations.poweredByUrl).toBe(initialConfigs.poweredByUrl);
    expect(configurations.settings.mainColor).toBe(
      initialConfigs.settings.mainColor
    );
    expect(configurations.settings.secondaryColor).toBe(
      initialConfigs.settings.secondaryColor
    );
    expect(configurations.settings.mainTextColor).toBe(
      initialConfigs.settings.mainTextColor
    );
    expect(configurations.settings.secondaryTextColor).toBe(
      initialConfigs.settings.secondaryTextColor
    );
  });
  it('should toggle the chat open', () => {
    configurations.toggleIsOpen();
    expect(configurations.isOpen).toBeTruthy();
    configurations.toggleIsOpen();
    expect(configurations.isOpen).toBeFalsy();
  });
  it('should open the chat', () => {
    configurations.open();
    expect(configurations.isOpen).toBeTruthy();
  });
  it('should close the chat', () => {
    configurations.close();
    expect(configurations.isOpen).toBeFalsy();
  });
});
