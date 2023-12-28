import { endianness } from 'os';

interface GetArrayOffsetFromPixelCoordinatesArgs {
  x: number;
  y: number;
  bytesPerPixel: number;
  bytesPerRow: number;
  imageHeight: number;
}

const getArrayOffsetFromPixelCoordinates = ({
  x,
  y,
  bytesPerPixel,
  bytesPerRow,
  imageHeight,
}: GetArrayOffsetFromPixelCoordinatesArgs): number => x * bytesPerPixel + y * bytesPerRow;

interface GetRotatedPixelArrayArgs {
  pixelArray: Buffer;
  bitsPerPixel: number;
  imageWidth: number;
  imageHeight: number;
}

const getRotatedPixelArray = ({
  pixelArray,
  bitsPerPixel,
  imageWidth,
  imageHeight,
}: GetRotatedPixelArrayArgs): Buffer => {
  const rotatedPixelArrayBuffer = Buffer.alloc(pixelArray.byteLength);
  const bytesPerPixel = bitsPerPixel / 8;

  if (bytesPerPixel < 1) {
    throw new Error('Rotation of bitmaps with fewer than 8 bits per pixel currently unsupported');
  }

  const unrotatedBytesPerRow = bytesPerPixel * imageWidth;
  const rotatedBytesPerRow = bytesPerPixel * imageHeight;

  for (let y = imageHeight - 1; y >= 0; y--) {
    for (let x = 0; x < imageWidth; x++) {
      const unrotatedArrayOffset = getArrayOffsetFromPixelCoordinates({
        x,
        y,
        imageHeight,
        bytesPerPixel,
        bytesPerRow: unrotatedBytesPerRow,
      });
      const rotatedArrayOffset = getArrayOffsetFromPixelCoordinates({
        x: y,
        y: imageWidth - x - 1,
        bytesPerPixel,
        imageHeight: imageWidth,
        bytesPerRow: rotatedBytesPerRow,
      });
      const pixelValue = pixelArray.readUIntBE(unrotatedArrayOffset, bytesPerPixel);
      rotatedPixelArrayBuffer.writeUIntBE(pixelValue, rotatedArrayOffset, bytesPerPixel);
    }
  }

  return rotatedPixelArrayBuffer;
};

export default getRotatedPixelArray;
