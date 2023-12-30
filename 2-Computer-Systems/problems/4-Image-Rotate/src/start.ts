import { open } from 'node:fs/promises';
import parseBitmapMetadata from './fileHeader/parseBitmapMetadata';
import getPixelArray from './pixelArray/getPixelArrray';
import getBitmapHeader from './fileHeader/getBitmapHeader';
import getRotatedPixelArray from './pixelArray/getRotatedPixelArray';
import getBitmapFooter from './fileFooter/getBitmapFooter';

const readTeapot = async () => {
  const teapotFile = await open('helpfiles/teapot.bmp');
  const fileHeader = await getBitmapHeader(teapotFile);
  const { fileSize, imageSize, imageWidth, imageHeight, bitsPerPixel, pixelArrayOffset } =
    parseBitmapMetadata(fileHeader);
  const pixelArray = await getPixelArray({
    bitmapFile: teapotFile,
    bytes: imageSize,
    pixelArrayOffset,
  });
  const rotatedPixelArray = getRotatedPixelArray({
    pixelArray,
    imageWidth,
    imageHeight,
    bitsPerPixel,
  });

  const rotatedTeapotFile = await open('helpfiles/my_rotated_teapot.bmp', 'wx');
  await rotatedTeapotFile.write(fileHeader);
  await rotatedTeapotFile.write(rotatedPixelArray, null, null, pixelArrayOffset);
  const rotatedTeapotFooter = await getBitmapFooter({
    file: rotatedTeapotFile,
    fileSize,
    imageSize,
    pixelArrayOffset,
  });
  if (rotatedTeapotFooter)
    await rotatedTeapotFile.write(rotatedTeapotFooter, null, null, pixelArrayOffset + imageSize);

  teapotFile.close();
  rotatedTeapotFile.close();
};

readTeapot();
