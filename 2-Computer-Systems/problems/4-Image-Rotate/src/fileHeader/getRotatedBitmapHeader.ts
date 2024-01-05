import { endianness } from 'os';
import { IMAGE_HEIGHT_OFFSET, IMAGE_WIDTH_OFFSET } from './parseBitmapMetadata';

interface GetRotatedBitmapHeaderArgs {
  unrotatedHeader: Buffer;
  rotatedImageWidth: number;
  rotatedImageHeight: number;
}

const getRotatedBitmapHeader = ({
  unrotatedHeader,
  rotatedImageWidth,
  rotatedImageHeight,
}: GetRotatedBitmapHeaderArgs): Buffer => {
  const rotatedHeader = Buffer.alloc(unrotatedHeader.byteLength, unrotatedHeader);
  if (endianness() === 'BE') {
    rotatedHeader.writeUInt32BE(rotatedImageWidth, IMAGE_WIDTH_OFFSET);
    rotatedHeader.writeUInt32BE(rotatedImageHeight, IMAGE_HEIGHT_OFFSET);
  } else {
    rotatedHeader.writeUInt32LE(rotatedImageWidth, IMAGE_WIDTH_OFFSET);
    rotatedHeader.writeUInt32LE(rotatedImageHeight, IMAGE_HEIGHT_OFFSET);
  }

  return rotatedHeader;
};

export default getRotatedBitmapHeader;
