import { PermissionsAndroid, Permission } from 'react-native';

export const requestExternalStoragePermission = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE as Permission,
      {
        title: 'Permissão de Armazenamento',
        message:
          'O aplicativo precisa de acesso ao armazenamento para baixar arquivos.',
        buttonNeutral: 'Perguntar depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.error('Falha ao solicitar permissão de armazenamento:', error);
    return false;
  }
};
