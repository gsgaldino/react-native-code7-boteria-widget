import { Document } from '../types/Message';

export const getFileNameFromUrl = (url: string): string => {
  const fullFilename = url.slice(url.lastIndexOf('/') + 1, url.length);
  const filenameWAux = fullFilename.replace(
    /([0-9a-fA-F]{24})-([0-9a-fA-F]{24})-/,
    ''
  );
  const auxCharactersQuantity = 20;
  const [filename, ext] = filenameWAux.split('.');

  return `${filename?.slice(0, -auxCharactersQuantity)}.${ext}`;
};

export const getFileNameFromAttachment = (document: Document) =>
  document.size ? document.title : getFileNameFromUrl(document.fileUrl);
