import { open } from 'fs/promises';

const assertSingleByte = (byte: number): void => {
  if (byte > 255 || byte < 0) {
    throw new Error(`Argument ${byte} is not a single byte`);
  }
};

type ByteCharPredicate = (byte: number) => boolean;

const isSingleByteChar: ByteCharPredicate = (byte) => {
  assertSingleByte(byte);

  // MSB as follows: 0xxxxxxx
  return (byte & 128) === 0;
};

const isContinuationByte: ByteCharPredicate = (byte) => {
  assertSingleByte(byte);

  // MSB as follows: 10xxxxxx
  return (byte & 192) === 128;
};

const isFirstByteOfMulti: ByteCharPredicate = (byte) =>
  isFirstOf2ByteChar(byte) || isFirstOf3ByteChar(byte) || isFirstOf4ByteChar(byte);

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

const DEBUG_LENGTH = 29;
const safelyTruncateUTF8Buffer = (utf8Buffer: Buffer, targetByteLength: number): Buffer => {
  const maxLengthBuffer = utf8Buffer.subarray(0, targetByteLength);

  if (targetByteLength === 0) return maxLengthBuffer;

  for (let offsetFromEnd = maxLengthBuffer.byteLength - 1; offsetFromEnd >= 0; offsetFromEnd--) {
    const currentByte = maxLengthBuffer[offsetFromEnd];
    if (isSingleByteChar(currentByte)) return maxLengthBuffer;

    // chop off the start of a multi-byte char
    if (isFirstByteOfMulti(currentByte)) return maxLengthBuffer.subarray(0, offsetFromEnd);

    if (!isContinuationByte(currentByte)) {
      throw new Error(`Unrecognised UTF-8 byte: ${currentByte}`);
    }
  }

  throw new Error(`No first or single UTF-8 bytes found`);
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
    // if (len !== DEBUG_LENGTH) return;
    console.log(len, '-', orig.toString('utf8'), '-', buf.toString('utf8'));
  });

  await caseFile.close();
};

runCaseFileTruncation();
