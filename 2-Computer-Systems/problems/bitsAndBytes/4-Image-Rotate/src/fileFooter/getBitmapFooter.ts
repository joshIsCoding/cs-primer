import { FileHandle } from 'fs/promises';

interface GetBitmapFooterArgs {
  file: FileHandle;
  fileSize: number;
  imageSize: number;
  pixelArrayOffset: number;
}

const getBitmapFooter = async ({
  file,
  fileSize,
  imageSize,
  pixelArrayOffset,
}: GetBitmapFooterArgs): Promise<Buffer | undefined> => {
  const footerSize = fileSize - imageSize - pixelArrayOffset;
  if (footerSize < 1) return Promise.resolve(undefined);

  const footer = Buffer.alloc(footerSize);
  const footerOffset = pixelArrayOffset + imageSize;

  await file.read({ buffer: footer, position: footerOffset, length: footerSize });

  return footer;
};

export default getBitmapFooter;
