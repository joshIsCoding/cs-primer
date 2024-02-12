import { open } from 'fs/promises';

const LINE_FEED_CHAR = 10;
const OUTPUT_FILENAME = 'truncated_lines.txt';

const assertSingleByte = (byte: number): void => {
  if (byte > 255 || byte < 0) {
    throw new Error(`Argument ${byte} is not a single byte`);
  }
};

type ByteCharPredicate = (byte: number) => boolean;

const isContinuationByte: ByteCharPredicate = (byte) => {
  assertSingleByte(byte);

  // MSB as follows: 10xxxxxx
  return (byte & 192) === 128;
};

const isSingleByteChar: ByteCharPredicate = (byte) => {
  assertSingleByte(byte);

  // MSB as follows: 0xxxxxxx
  return (byte & 128) === 0;
};

const isFirstOf2ByteChar: ByteCharPredicate = (byte) => {
  assertSingleByte(byte);

  //  most significant bits match 110xxxxx
  return (byte & 224) === 192;
};

const isFirstOf3ByteChar: ByteCharPredicate = (byte) => {
  assertSingleByte(byte);

  //  most significant bits match 1110xxxx
  return (byte & 240) === 224;
};

const isFirstOf4ByteChar: ByteCharPredicate = (byte) => {
  assertSingleByte(byte);

  //  most significant bits match 11110xxx
  return (byte & 248) === 240;
};

const isFirstByteOfChar: ByteCharPredicate = (byte) =>
  [isSingleByteChar, isFirstOf2ByteChar, isFirstOf3ByteChar, isFirstOf4ByteChar].some((predicate) =>
    predicate(byte)
  );

const getIndexOfFirstByteOfLastChar = (bytes: Buffer): number => {
  for (let invertedIndex = 0; invertedIndex < 4; invertedIndex++) {
    const i = bytes.byteLength - invertedIndex - 1;
    const currentByte = bytes[i];
    if (isContinuationByte(currentByte)) continue;

    if (isFirstByteOfChar(currentByte)) return i;
  }
  throw new Error(`No UTF-8 first bytes found in ${bytes}`);
};

const safelyTruncateUTF8Buffer = (untruncatedBuffer: Buffer, targetByteLength: number): Buffer => {
  const maxBufferLength = Math.min(untruncatedBuffer.byteLength, targetByteLength);
  const truncatedBuffer = Buffer.alloc(maxBufferLength + 1);
  untruncatedBuffer.copy(truncatedBuffer);
  // this length will always be <= targetByteLength
  const safeBufferLength = getIndexOfFirstByteOfLastChar(truncatedBuffer);

  return truncatedBuffer.subarray(0, safeBufferLength);
};

const runCaseFileTruncation = async () => {
  const caseFile = await open('helpfiles/cases', 'r');
  const outputFile = await open(OUTPUT_FILENAME, 'w');
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
      truncatedLines.push(safelyTruncateUTF8Buffer(lineToTruncate, bytesToTruncate));
      truncatedLines.push(Buffer.from([LINE_FEED_CHAR]));
      lastEOLOffset = currentByteOffset;
    }
    currentByteOffset++;
  }

  await outputFile.writeFile(Buffer.concat(truncatedLines));
  console.log(`-> Truncated lines saved to ${OUTPUT_FILENAME}`);

  await outputFile.close();
  await caseFile.close();
};

runCaseFileTruncation();
