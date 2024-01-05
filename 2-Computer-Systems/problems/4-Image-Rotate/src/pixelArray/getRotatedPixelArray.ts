interface PixelCoordinates {
  x: number;
  y: number;
}

interface GetRotatedPixelCoordinatesArgs extends PixelCoordinates {
  imageWidth: number;
}

const getRotatedPixelCoordinates = ({
  x: unrotatedX,
  y: unrotatedY,
  imageWidth,
}: GetRotatedPixelCoordinatesArgs): PixelCoordinates => ({
  x: unrotatedY,
  y: imageWidth - unrotatedX - 1,
});

interface GetBytesPerRowArgs {
  bytesPerPixel: number;
  pixelsPerRow: number;
}

const getBytesPerRow = ({ bytesPerPixel, pixelsPerRow }: GetBytesPerRowArgs): number => {
  const pixelBytesPerRow = bytesPerPixel * pixelsPerRow;
  const divisionBy4Remainder = pixelBytesPerRow % 4;
  const rowPadding = divisionBy4Remainder === 0 ? 0 : 4 - divisionBy4Remainder;

  return pixelBytesPerRow + rowPadding;
};
interface GetArrayOffsetFromPixelCoordinatesArgs {
  x: number;
  y: number;
  bytesPerPixel: number;
  bytesPerRow: number;
}

const getArrayOffsetFromPixelCoordinates = ({
  x,
  y,
  bytesPerPixel,
  bytesPerRow,
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
  const bytesPerPixel = bitsPerPixel / 8;
  if (bytesPerPixel < 1) {
    throw new Error('Rotation of bitmaps with fewer than 8 bits per pixel currently unsupported');
  }

  const unrotatedBytesPerRow = getBytesPerRow({ bytesPerPixel, pixelsPerRow: imageWidth });
  const rotatedBytesPerRow = getBytesPerRow({ bytesPerPixel, pixelsPerRow: imageHeight });

  const rotatedPixelArrayBuffer = Buffer.alloc(rotatedBytesPerRow * imageWidth);

  for (let y = 0; y < imageHeight; y++) {
    for (let x = 0; x < imageWidth; x++) {
      const unrotatedArrayOffset = getArrayOffsetFromPixelCoordinates({
        x,
        y,
        bytesPerPixel,
        bytesPerRow: unrotatedBytesPerRow,
      });
      const rotatedArrayOffset = getArrayOffsetFromPixelCoordinates({
        ...getRotatedPixelCoordinates({ x, y, imageWidth }),
        bytesPerPixel,
        bytesPerRow: rotatedBytesPerRow,
      });
      const pixelValue = pixelArray.readUIntBE(unrotatedArrayOffset, bytesPerPixel);
      rotatedPixelArrayBuffer.writeUIntBE(pixelValue, rotatedArrayOffset, bytesPerPixel);
    }
  }

  return rotatedPixelArrayBuffer;
};

export default getRotatedPixelArray;
