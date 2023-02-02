import RNFS from 'react-native-fs';

export const toBase64 = async (localFileUrl: string): Promise<string> => {
  return await RNFS.readFile(localFileUrl, 'base64');
};
