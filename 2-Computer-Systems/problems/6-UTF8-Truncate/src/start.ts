import { open } from 'fs/promises';

const LINE_FEED_CHAR = 10;
const OUTPUT_FILENAME = 'truncated_lines.txt';

const assertSingleByte = (byte: number): void => {
  if (byte > 255 || byte < 0) {
    throw new Error(`Argument ${byte} is not a single byte`);
  }
};

type ByteCharPredicate = (byte: number) => boolean;

const isContinuationByte: ByteCharPredicate = (byte) => (byte & 0xc0) === 0x80;

const isSingleByteChar: ByteCharPredicate = (byte) => (byte & 0x80) === 0;

const isFirstOf2ByteChar: ByteCharPredicate = (byte) => (byte & 0xe0) === 0xc0;

const isFirstOf3ByteChar: ByteCharPredicate = (byte) => (byte & 0xf0) === 0xe0;

const isFirstOf4ByteChar: ByteCharPredicate = (byte) => (byte & 0xf8) === 0xf0;

const isFirstByteOfChar: ByteCharPredicate = (byte) => {
  assertSingleByte(byte);

  return [isSingleByteChar, isFirstOf2ByteChar, isFirstOf3ByteChar, isFirstOf4ByteChar].some(
    (predicate) => predicate(byte)
  );
};

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
