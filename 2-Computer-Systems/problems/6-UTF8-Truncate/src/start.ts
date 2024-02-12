import { open } from 'fs/promises';

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

const getIndexOfFirstByteOfLastChar = (bytes: Buffer): number => {
  for (let invertedIndex = 0; invertedIndex < 4; invertedIndex++) {
    const i = bytes.byteLength - invertedIndex - 1;
    const currentByte = bytes[i];
    if (isContinuationByte(currentByte)) continue;

    if (isSingleByteChar(currentByte)) return i;

    if (isFirstOf2ByteChar(currentByte) && invertedIndex > 0) return i;

    if (isFirstOf3ByteChar(currentByte) && invertedIndex > 1) return i;

    if (isFirstOf4ByteChar(currentByte) && invertedIndex > 2) return i;
  }
  throw new Error(`No UTF-8 first bytes found in ${bytes}`);
};

const safelyTruncateUTF8Buffer = (untruncatedBuffer: Buffer, targetByteLength: number): Buffer => {
  const minimallyTruncatedBuffer = untruncatedBuffer.subarray(0, targetByteLength);

  if (targetByteLength === 0) return minimallyTruncatedBuffer;

  const safeBufferLength = Math.min(
    getIndexOfFirstByteOfLastChar(minimallyTruncatedBuffer),
    minimallyTruncatedBuffer.byteLength
  );

  return minimallyTruncatedBuffer.subarray(0, safeBufferLength);
};

const runCaseFileTruncation = async () => {
  const caseFile = await open('helpfiles/cases', 'r');
  const truncatedLines: Array<[number, Buffer, Buffer]> = [];
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

    // line-feed character
    if (currentByte === 10) {
      // skip up to 2 bytes - one for any previous EOL and one for the truncation integer
      const startSlice = lastEOLOffset === undefined ? 1 : lastEOLOffset + 2;
      const lineToTruncate = fileBuffer.subarray(startSlice, currentByteOffset);
      truncatedLines.push([
        bytesToTruncate,
        lineToTruncate,
        safelyTruncateUTF8Buffer(lineToTruncate, bytesToTruncate),
      ]);
      lastEOLOffset = currentByteOffset;
    }
    currentByteOffset++;
  }

  truncatedLines.forEach(([len, orig, buf]) => {
    console.log(
      len.toString().padEnd(3),
      '-',
      orig.toString('utf8').padEnd(30),
      '-',
      buf.toString('utf8')
    );
  });

  await caseFile.close();
};

runCaseFileTruncation();
