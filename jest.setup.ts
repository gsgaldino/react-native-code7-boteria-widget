import { initialConfigs as mockInitialConfigs } from './src/constants';

/**
 * Fix to the error: Invariant Violation: `new NativeEventEmitter()` requires a non-null argument
 * @see https://stackoverflow.com/questions/70506663/invariant-violation-new-nativeeventemitter-requires-a-non-null-argument
 */
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-encrypted-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('react-native-fs', () => ({
  readFile: jest.fn(),
}));

jest.mock('react-native-document-picker', () => ({
  pick: jest.fn(),
  isCancel: jest.fn(),
}));

jest.mock('./src/context/ChatConfigurationsContext', () => ({
  useChatConfigurations: jest.fn().mockImplementation(() => ({
    chatConfigurations: mockInitialConfigs,
  })),
}));
