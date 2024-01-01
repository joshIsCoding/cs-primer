import * as readline from 'node:readline/promises';
import rotateBitmap, { BITMAP_FILE_EXT_REGEX } from './rotateBitmap';
import { access, constants } from 'node:fs/promises';
import { stdin, stdout } from 'node:process';

const rl = readline.createInterface({ input: stdin, output: stdout });

async function requestBMPFilename(): Promise<string> {
  const _inputFilename = await rl.question('Please enter a BMP file path: ');
  const inputFilename = _inputFilename.trim();
  try {
    await access(inputFilename, constants.R_OK);
  } catch {
    rl.write('\nSorry, that file could not be accessed.\n');
    return requestBMPFilename();
  }
  if (!inputFilename.match(BITMAP_FILE_EXT_REGEX)) {
    console.warn('\nYour input file has a missing or unexpected extension\n');
  }

  return inputFilename;
}

const runFileRotationCLI = async () => {
  const bmpFilename = await requestBMPFilename();
  const rotatedBitmapFilename = await rotateBitmap(bmpFilename);

  console.log(`-> Success! Rotated bitmap saved as ${rotatedBitmapFilename}`);
};

runFileRotationCLI().then(() => rl.close());
