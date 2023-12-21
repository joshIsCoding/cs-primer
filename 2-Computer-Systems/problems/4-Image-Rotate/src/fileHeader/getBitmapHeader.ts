import { FileHandle } from 'fs/promises';
import assertBitmapSignature from './assertBitmapSignature';

// Assumes V5 header but excludes any colour table (plus gap)
const getBitmapHeader = async (bmpFile: FileHandle): Promise<Buffer> => {
  const headerBuffer = Buffer.alloc(106);
  const { bytesRead } = await bmpFile.read({ buffer: headerBuffer, length: 38 });
  assertBitmapSignature(headerBuffer);

  return headerBuffer;
};

export default getBitmapHeader;
