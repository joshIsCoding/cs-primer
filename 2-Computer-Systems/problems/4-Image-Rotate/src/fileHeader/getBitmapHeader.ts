import { FileHandle } from 'fs/promises';
import assertBitmapSignature from './assertBitmapSignature';
import { PIXEL_ARRAY_OFFSET } from './parseBitmapMetadata';

const getBitmapHeader = async (bmpFile: FileHandle): Promise<Buffer> => {
  const defaultHeaderSize = 106;
  const headerBuffer = Buffer.alloc(defaultHeaderSize);
  await bmpFile.read({ buffer: headerBuffer, length: defaultHeaderSize });
  assertBitmapSignature(headerBuffer);
  // infer full header size (plus any colour table) from pixel array position
  const headerSize = headerBuffer.readUInt32LE(PIXEL_ARRAY_OFFSET);

  if (defaultHeaderSize === headerSize) return headerBuffer;

  // resize returned buffer as necessary to match full header + colour table

  if (defaultHeaderSize > headerSize) return headerBuffer.subarray(0, headerSize);

  const fullHeaderBuffer = Buffer.alloc(headerSize, headerBuffer);
  await bmpFile.read({
    buffer: fullHeaderBuffer,
    length: headerSize - defaultHeaderSize,
    offset: defaultHeaderSize,
    position: defaultHeaderSize,
  });

  return fullHeaderBuffer;
};

export default getBitmapHeader;
