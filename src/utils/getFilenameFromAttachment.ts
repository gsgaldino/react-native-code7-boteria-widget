import { Document } from '../types/Message';

export const getFileNameFromUrl = (url: string): string => {
  const fullFilename = url
    ? url.slice(url.lastIndexOf('/') + 1, url.length)
    : 'Name';

  const filenameWAux = fullFilename.replace(
    /([0-9a-fA-F]{24})-([0-9a-fA-F]{24})-/,
    ''
  );
  const auxCharactersQuantity = 20;
  const [filename, ext] = filenameWAux.split('.');

  return `${filename?.slice(0, -auxCharactersQuantity)}.${ext}`;
};

export const getFileNameFromAttachment = (document: Document) => {
  return document.title || getFileNameFromUrl(document?.fileUrl);
};
