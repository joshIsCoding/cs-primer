import { open } from 'node:fs/promises';
import parseBitmapMetadata from './fileHeader/parseBitmapMetadata';
import getPixelArray from './pixelArray/getPixelArrray';
import getBitmapHeader from './fileHeader/getBitmapHeader';

const readTeapot = async () => {
  const teapotFile = await open('helpfiles/teapot.bmp');
  const fileHeader = await getBitmapHeader(teapotFile);
  const { imageSize, imageXPixels, imageYPixels, bitsPerPixel, pixelArrayOffset } =
    parseBitmapMetadata(fileHeader);
  const pixelArray = await getPixelArray({
    bitmapFile: teapotFile,
    bytes: imageSize,
    pixelArrayOffset,
  });
};

readTeapot();
