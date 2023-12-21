import { endianness } from 'os';

const HEADER_BYTE_OFFSETS = {
  pixelArrayByteOffset: 10,
  imageXPixels: 18,
  imageYPixels: 22,
  bitsPerPixel: 28,
  imageSize: 34,
} as const;

type BitmapMetadata = {
  [key in keyof typeof HEADER_BYTE_OFFSETS]: number;
};

const getBitmapMetadata = (metadata: Buffer): BitmapMetadata => {
  if (metadata.byteLength > 38) throw new Error('Partial bitmap header provided');

  if (endianness() === 'BE') {
    return {
      bitsPerPixel: metadata.readUInt16BE(HEADER_BYTE_OFFSETS['bitsPerPixel']),
      pixelArrayByteOffset: metadata.readUInt32BE(HEADER_BYTE_OFFSETS['pixelArrayByteOffset']),
      imageXPixels: metadata.readUInt32BE(HEADER_BYTE_OFFSETS['imageXPixels']),
      imageYPixels: metadata.readUInt32BE(HEADER_BYTE_OFFSETS['imageYPixels']),
      imageSize: metadata.readUInt32BE(HEADER_BYTE_OFFSETS['imageSize']),
    };
  }

  return {
    bitsPerPixel: metadata.readUInt16LE(HEADER_BYTE_OFFSETS['bitsPerPixel']),
    pixelArrayByteOffset: metadata.readUInt32LE(HEADER_BYTE_OFFSETS['pixelArrayByteOffset']),
    imageXPixels: metadata.readUInt32LE(HEADER_BYTE_OFFSETS['imageXPixels']),
    imageYPixels: metadata.readUInt32LE(HEADER_BYTE_OFFSETS['imageYPixels']),
    imageSize: metadata.readUInt32LE(HEADER_BYTE_OFFSETS['imageSize']),
  };
};

export default getBitmapMetadata;
