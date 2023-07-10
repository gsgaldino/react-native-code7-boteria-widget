import type { Message, Document } from '../../types';
import { MessageTypes, From } from '../../types';
import type { DocumentPicker } from '../interfaces/DocumentPicker';

import { getMessageType } from '../../components/Chat/components/Input/utils/getMessageType';
import type { DocumentPickerResponse } from 'react-native-document-picker';
import DocumentPickerModule from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { toBase64 } from '../../utils/toBase64';

interface ISupportedExtensions {
  [key: string]: string;
}

/**
 * TODO: Improve me by applying the Strategy pattern
 * to handle different file types more effectively and avoid
 * the proliferation of if statements.
 */
export class RNDocumentPickerAdapter implements DocumentPicker {
  public async pick(): Promise<Message | null> {
    try {
      const response = await DocumentPickerModule.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
      });

      const [message] = response.map(async (file: DocumentPickerResponse) => {
        const [type, ext] = (file?.type as string)?.split('/');
        const messageType = getMessageType(type as string);

        if (file.size !== null) {
          const sizeFileMB = file.size / (1024 * 1024);
          if (sizeFileMB > 14) throw new Error('Tamanho de mídia');
        }
        const base64String = await toBase64(file?.uri);

        const msg: Message = {
          ext,
          from: From.USER,
          isMedia: true,
          type: messageType,
          message: `data:${file?.type};base64,${base64String}`,
          localFileUri: file?.uri,
        };

        const supportedExtensionsAndTheirValues: ISupportedExtensions = {
          'comma-separated-values': 'csv',
          'plain': 'txt',
          'vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
          'msword': 'doc',
          'vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
          'vnd.ms-excel': 'xls',
          'vnd.ms-powerpoint': 'ppt',
          'vnd.openxmlformats-officedocument.presentationml.presentation':
            'pptx',
          'x-zip-compressed': 'zip',
        };

        const supportedExtensions = Object.keys(
          supportedExtensionsAndTheirValues
        );

        if ([MessageTypes.DOCUMENT, MessageTypes.VIDEO].includes(messageType)) {
          if (supportedExtensions.includes(msg.ext as string)) {
            const extension =
              supportedExtensionsAndTheirValues[msg.ext as string];
            return {
              ...msg,
              ext: extension,
              message: `data:${type}/${extension};base64,${base64String}`,
              document: {
                fileUrl: file?.uri,
                size: file?.size || 0,
                title: file?.name || '',
              },
            };
          }

          msg.document = {
            fileUrl: file?.uri,
            size: file?.size,
            title: file?.name,
          } as unknown as Document;
        } else if (messageType === MessageTypes.AUDIO) {
          const temporaryPath = `${RNFS.CachesDirectoryPath}/${Date.now()}.mp3`;
          await RNFS.copyFile(file?.uri, temporaryPath);
          return {
            ...msg,
            ext: 'mp3',
            audio: {
              fileUrl: temporaryPath,
              size: file?.size || 0,
              title: file?.name || '',
            },
          };
        }

        return msg;
      });

      return message || null;
    } catch (error) {
      if (DocumentPickerModule.isCancel(error)) return null;
      throw error;
    }
  }
}
