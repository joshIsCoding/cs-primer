import { open } from 'fs/promises';

const runCaseFileTruncation = async () => {
  const caseFile = await open('helpfiles/cases', 'r');
  const caseLines: Buffer[] = [];
  const fileBuffer = await caseFile.readFile();

  let lastEOLOffset = 0;
  let currentByteOffset = 0;
  for (const currentByte of fileBuffer) {
    if (currentByte === 10) {
      // chop off the line-feed char
      caseLines.push(fileBuffer.subarray(lastEOLOffset, currentByteOffset));
      lastEOLOffset = currentByteOffset;
    }
    currentByteOffset++;
  }

  caseLines.forEach((buf) => console.log(buf.toString('utf8')));

  await caseFile.close();
};

runCaseFileTruncation();
