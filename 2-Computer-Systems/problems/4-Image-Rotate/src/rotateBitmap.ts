import { open } from 'node:fs/promises';
import getBitmapFooter from './fileFooter/getBitmapFooter';
import getBitmapHeader from './fileHeader/getBitmapHeader';
import parseBitmapMetadata from './fileHeader/parseBitmapMetadata';
import getPixelArray from './pixelArray/getPixelArrray';
import getRotatedPixelArray from './pixelArray/getRotatedPixelArray';
import getRotatedBitmapHeader from './fileHeader/getRotatedBitmapHeader';

export const BITMAP_FILE_EXT_REGEX = /\.[bB][mM][pP]$/;

const getRotatedFileName = (unrotatedFilename: string): string =>
  `${unrotatedFilename.replace(BITMAP_FILE_EXT_REGEX, '')}_rotated.bmp`;

async function rotateBitmap(filename: string): Promise<string> {
  const unrotatedBitmapFile = await open(filename);
  const unrotatedHeader = await getBitmapHeader(unrotatedBitmapFile);
  const { fileSize, imageSize, imageWidth, imageHeight, bitsPerPixel, pixelArrayOffset } =
    parseBitmapMetadata(unrotatedHeader);
  const pixelArray = await getPixelArray({
    bitmapFile: unrotatedBitmapFile,
    bytes: imageSize,
    pixelArrayOffset,
  });
  const rotatedPixelArray = getRotatedPixelArray({
    pixelArray,
    imageWidth,
    imageHeight,
    bitsPerPixel,
  });

  const rotatedFileName = getRotatedFileName(filename);
  const rotatedBitmapFile = await open(rotatedFileName, 'wx');
  const rotatedBitmapFileHeader = getRotatedBitmapHeader({
    unrotatedHeader,
    rotatedImageHeight: imageWidth,
    rotatedImageWidth: imageHeight,
  });
  await rotatedBitmapFile.write(rotatedBitmapFileHeader);
  await rotatedBitmapFile.write(rotatedPixelArray, null, null, pixelArrayOffset);
  const rotatedFileFooter = await getBitmapFooter({
    file: rotatedBitmapFile,
    fileSize,
    imageSize,
    pixelArrayOffset,
  });
  if (rotatedFileFooter)
    await rotatedBitmapFile.write(rotatedFileFooter, null, null, pixelArrayOffset + imageSize);

  unrotatedBitmapFile.close();
  rotatedBitmapFile.close();

  return rotatedFileName;
}

export default rotateBitmap;
