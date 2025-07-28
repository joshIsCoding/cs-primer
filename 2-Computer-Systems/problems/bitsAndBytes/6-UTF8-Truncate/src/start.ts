import { open } from 'fs/promises';

const LINE_FEED_CHAR = 0x0a;
const CARRIAGE_RETURN_CHAR = 0x0d;
const ZERO_WIDTH_JOINER_BUFFER = Buffer.from([0xe2, 0x80, 0x8d]);

const assertSingleByte = (byte: number): void => {
  if (byte > 255 || byte < 0) {
    throw new Error(`Argument ${byte} is not a single byte`);
  }
};

type ByteCharPredicate = (byte: number) => boolean;

const isContinuationByte: ByteCharPredicate = (byte) => {
  assertSingleByte(byte);

  return (byte & 0xc0) === 0x80;
};

const isZeroWidthJoiner = (threeByteBuffer: Buffer): boolean => {
  if (threeByteBuffer.byteLength !== 3)
    throw new Error(`Buffer ${threeByteBuffer.toString('hex')} is not three bytes long`);

  return threeByteBuffer.equals(ZERO_WIDTH_JOINER_BUFFER);
};

const getSafeTruncationByteLength = (bytes: Buffer, targetByteLength: number): number => {
  if (bytes.byteLength < targetByteLength) return bytes.byteLength;

  let firstOmittedCharOffset: number | undefined;
  // start reading at 1 byte over target length
  for (let i = targetByteLength; i >= targetByteLength - 4; i--) {
    const currentByte = bytes[i];

    if (!isContinuationByte(currentByte)) {
      firstOmittedCharOffset = i;
      break;
    }
  }
  if (firstOmittedCharOffset === undefined) {
    throw new Error(`Unexpected UTF-8 byte pattern found in ${bytes.toString('utf-8')}`);
  }

  const last3Bytes = bytes.subarray(firstOmittedCharOffset - 3, firstOmittedCharOffset);
  const omitted3Bytes = bytes.subarray(firstOmittedCharOffset, firstOmittedCharOffset + 3);

  if (last3Bytes.byteLength === 3 && isZeroWidthJoiner(last3Bytes)) {
    return getSafeTruncationByteLength(bytes, Math.max(firstOmittedCharOffset - 3, 0));
  }
  if (omitted3Bytes.byteLength === 3 && isZeroWidthJoiner(omitted3Bytes)) {
    return getSafeTruncationByteLength(bytes, firstOmittedCharOffset - 1);
  }

  return firstOmittedCharOffset;
};

const truncateUTF8Buffer = (untruncatedBuffer: Buffer, targetByteLength: number): Buffer => {
  const safeBufferLength = getSafeTruncationByteLength(untruncatedBuffer, targetByteLength);
  const truncatedBuffer = Buffer.alloc(safeBufferLength);
  untruncatedBuffer.copy(truncatedBuffer);

  return truncatedBuffer;
};

const runCaseFileTruncation = async () => {
  const caseFile = await open('helpfiles/cases', 'r');
  const truncatedLines: Buffer[] = [];
  const fileBuffer = await caseFile.readFile();

  let lastEOLOffset: number | undefined = undefined;
  let bytesToTruncate: number | undefined = undefined;
  let currentByteOffset = 0;
  for (const currentByte of fileBuffer) {
    if (
      bytesToTruncate === undefined ||
      (lastEOLOffset !== undefined && lastEOLOffset + 1 === currentByteOffset)
    ) {
      bytesToTruncate = currentByte;
    }

    if (currentByte === LINE_FEED_CHAR) {
      // skip up to 2 bytes - one for any previous EOL and one for the truncation integer
      const startSlice = lastEOLOffset === undefined ? 1 : lastEOLOffset + 2;
      const lineToTruncate = fileBuffer.subarray(startSlice, currentByteOffset);

      const truncatedLine = truncateUTF8Buffer(lineToTruncate, bytesToTruncate);
      truncatedLines.push(truncatedLine);
      truncatedLines.push(Buffer.from([LINE_FEED_CHAR]));

      lastEOLOffset = currentByteOffset;
    }
    currentByteOffset++;
  }

  process.stdout.write(Buffer.concat(truncatedLines));

  await caseFile.close();
};

runCaseFileTruncation();
