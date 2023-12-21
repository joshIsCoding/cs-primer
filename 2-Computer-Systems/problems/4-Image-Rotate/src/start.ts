import { open } from 'node:fs/promises';
import getBitmapMetadata from './fileHeader/getBitmapMetadata';

function assertBitMapSignature(metadata: Buffer): void {
  const sig = metadata.subarray(0, 2);
  if (sig.toString('ascii') === 'BM') return;

  throw new Error('File header signature does not match that of a bitmap');
}

const readTeapot = async () => {
  const teapotFile = await open('helpfiles/teapot.bmp');
  const metadataBuffer = Buffer.alloc(38);
  const { bytesRead } = await teapotFile.read({ buffer: metadataBuffer, length: 38 });
  assertBitMapSignature(metadataBuffer);
  const { imageSize, imageXPixels, imageYPixels, bitsPerPixel, pixelArrayByteOffset } =
    getBitmapMetadata(metadataBuffer);
};

readTeapot();
