import { open } from 'node:fs/promises';
import getBitmapMetadata from './fileHeader/getBitmapMetadata';
import getPixelArray from './pixelArray/getPixelArrray';
import getBitmapHeader from './fileHeader/getBitmapHeader';

const readTeapot = async () => {
  const teapotFile = await open('helpfiles/teapot.bmp');
  const fileHeader = await getBitmapHeader(teapotFile);
  const { imageSize, imageXPixels, imageYPixels, bitsPerPixel, pixelArrayOffset } =
    getBitmapMetadata(fileHeader);
  const pixelArray = await getPixelArray({
    bitmapFile: teapotFile,
    bytes: imageSize,
    pixelArrayOffset,
  });
};

readTeapot();
