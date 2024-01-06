export const PIXEL_ARRAY_OFFSET = 10;
export const IMAGE_WIDTH_OFFSET = 18;
export const IMAGE_HEIGHT_OFFSET = 22;

const HEADER_BYTE_OFFSETS = {
  fileSize: 2,
  pixelArrayOffset: PIXEL_ARRAY_OFFSET,
  imageWidth: IMAGE_WIDTH_OFFSET,
  imageHeight: IMAGE_HEIGHT_OFFSET,
  bitsPerPixel: 28,
  imageSize: 34,
} as const;

type BitmapMetadata = {
  [key in keyof typeof HEADER_BYTE_OFFSETS]: number;
};

const parseBitmapMetadata = (metadata: Buffer): BitmapMetadata => {
  if (metadata.byteLength < 38) throw new Error('Partial bitmap header provided');

  return {
    bitsPerPixel: metadata.readUInt16LE(HEADER_BYTE_OFFSETS['bitsPerPixel']),
    pixelArrayOffset: metadata.readUInt32LE(HEADER_BYTE_OFFSETS['pixelArrayOffset']),
    imageWidth: metadata.readUInt32LE(HEADER_BYTE_OFFSETS['imageWidth']),
    imageHeight: metadata.readUInt32LE(HEADER_BYTE_OFFSETS['imageHeight']),
    imageSize: metadata.readUInt32LE(HEADER_BYTE_OFFSETS['imageSize']),
    fileSize: metadata.readUInt32LE(HEADER_BYTE_OFFSETS['fileSize']),
  };
};

export default parseBitmapMetadata;
