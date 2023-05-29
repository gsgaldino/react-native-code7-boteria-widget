// import RNFS from 'react-native-fs';

export const toBase64 = async (localFileUrl: string): Promise<string> => {
  return Promise.resolve(localFileUrl);
  // return await RNFS.readFile(localFileUrl, 'base64');
};
