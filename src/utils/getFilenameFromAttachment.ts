import { Document } from 'types/Message';

export const getFileNameFromUrl = (url: string) => {
  const filename = url.substring(url.lastIndexOf('/') + 1).substring(50);

  if (filename.substring(0, filename.lastIndexOf('.')).length === 12) {
    return filename;
  }

  const auxFile = filename.substring(0, filename.lastIndexOf('-'));
  const newFilename = auxFile.substring(0, auxFile.lastIndexOf('-'));
  const extension = filename.substring(filename.length - 3);

  return `${newFilename}.${extension}`;
};

export const getFileNameFromAttachment = (document: Document) => {
  if (document) {
    if (document && document?.size) {
      return document?.title;
    }
    if (document && document?.fileUrl) {
      return getFileNameFromUrl(document?.fileUrl);
    }
  }
  return '';
};
