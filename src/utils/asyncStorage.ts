import AsyncStorage from '@react-native-async-storage/async-storage';
const storageKey = '@code7-boteria-lib-mobile-rn/session';
import { Message } from '../types/Message';

interface ISessionStorageProps {
  sessionId?: string;
  messages: Message[];
}

export const getItemsAsync = async () => {
  const data = await AsyncStorage.getItem(storageKey);
  return data;
};

export const updateSessionIdAsync = async (sessionId: string) => {
  try {
    const newData = {
      messages: [],
      sessionId,
    };

    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch (error) {
    console.log('asyncStorage.updateSessionIdAsync Error setting sessionId');
  }
};

export const updateAsync = async (data: ISessionStorageProps) => {
  await AsyncStorage.setItem(storageKey, JSON.stringify(data));
};

export const clearAsync = async () => {
  return await AsyncStorage.clear();
};
