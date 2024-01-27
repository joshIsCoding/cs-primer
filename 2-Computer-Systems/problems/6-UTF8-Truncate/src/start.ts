import { open } from 'fs/promises';

const runCaseFileTruncation = async () => {
  const caseFile = await open('helpfiles/cases', 'r');
  const caseLines: Buffer[] = [];
  const fileBuffer = await caseFile.readFile();

  let lastEOLOffset = 0;
  let bytesToTruncate: number | null = null;
  let currentByteOffset = 0;
  for (const currentByte of fileBuffer) {
    if (bytesToTruncate === null || lastEOLOffset + 1 === currentByteOffset) {
      bytesToTruncate = currentByte;
    }

    if (currentByte === 10) {
      console.log(bytesToTruncate);
      // chop off the line-feed char and 'bytes to truncate' target
      caseLines.push(fileBuffer.subarray(lastEOLOffset + 1, currentByteOffset));
      lastEOLOffset = currentByteOffset;
    }
    currentByteOffset++;
  }

  caseLines.forEach((buf) => console.log(buf.toString('utf8')));

  await caseFile.close();
};

runCaseFileTruncation();
