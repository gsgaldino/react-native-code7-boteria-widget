import * as FileSystem from 'expo-file-system';

interface ISaveAndroidFileProps {
  fileUri: string;
  fileName: string;
  contentType: string;
}

export const saveAndroidFile = async (properties: ISaveAndroidFileProps) => {
  try {
    const fileString = await FileSystem.readAsStringAsync(properties.fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }

    try {
      await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        properties.fileName,
        properties.contentType
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, fileString, {
            encoding: FileSystem.EncodingType.Base64,
          });
          console.log('document downloaded successfully');
        })
        .catch(console.log);
    } catch (error) {
      console.log('ERROR', error);
    }
  } catch (err) {}
};

export const saveIosFile = () => {};
