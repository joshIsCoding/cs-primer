import { FileHandle } from 'fs/promises';

interface GetPixelArrayArgs {
  bitmapFile: FileHandle;
  bytes: number;
  pixelArrayOffset: number;
}

const getPixelArray = async ({
  bitmapFile,
  bytes,
  pixelArrayOffset,
}: GetPixelArrayArgs): Promise<Buffer> => {
  const pixelArrayBuffer = Buffer.alloc(bytes);
  await bitmapFile.read({ buffer: pixelArrayBuffer, length: bytes, position: pixelArrayOffset });

  return pixelArrayBuffer;
};

export default getPixelArray;
