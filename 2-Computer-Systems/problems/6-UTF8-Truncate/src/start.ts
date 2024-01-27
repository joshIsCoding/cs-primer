import { open } from 'fs/promises';

const runCaseFileTruncation = async () => {
  const caseFile = await open('helpfiles/cases', 'r');
  const lineBuffers: Buffer[] = [];
  const caseStream = caseFile.createReadStream();
  caseStream.on('readable', function () {
    let currentByte: Buffer | undefined | null;
    // let currentLine = Buffer.from([])
    while (currentByte !== null) {
      currentByte = caseStream.read(1);
      if (!currentByte) continue;

      if (currentByte.readInt8() === 10) {
        console.log('New line char found!');
      }
    }
  });
  caseStream.on('end', async function () {
    console.log('Closing stream');
    await caseFile.close();
  });
};

runCaseFileTruncation();
