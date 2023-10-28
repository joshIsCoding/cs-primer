import convertHexColorToRGB from './convertHexColorToRGB';
import { readFile, access, constants, writeFile } from 'fs/promises';
import { stdin, stdout } from 'process';
import * as readline from 'node:readline/promises';
import { matchAndReplaceHexColors } from './utils/regex/matchAndReplaceHexColors';

console.log('Convert #f5a742 to RGB', convertHexColorToRGB('#f5a742'));
console.log('Convert #CCC to RGB', convertHexColorToRGB('#CCC'));
console.log('Convert #fa1b to RGB', convertHexColorToRGB('#fa1b'));
console.log('Convert #97B57FC9 to RGB', convertHexColorToRGB('#97B57FC9'));
console.log('Convert #97B57FC9 to RGB', convertHexColorToRGB('#97B57FC9'));
console.log('Convert #69968C8C to RGB', convertHexColorToRGB('#69968C8C'));

const rl = readline.createInterface({ input: stdin, output: stdout });

function requestFilenameInput(): Promise<string> {
  return rl.question('Please enter a CSS file path: ').then((inputFilename) =>
    access(inputFilename, constants.R_OK | constants.W_OK)
      .then(() => inputFilename)
      .catch(() => {
        rl.write('Sorry, that file could not be accessed.');
        return requestFilenameInput();
      })
  );
}

function requestOutputFilenameInput(inputFilename: string): Promise<[string, string]> {
  return rl
    .question(`(Optional) please enter the output filename [${inputFilename}]:`)
    .then((outputFilename) => [inputFilename, outputFilename]);
}

function convertCSSAndWriteToFile(inputFilename: string, outputFilename: string) {
  readFile(inputFilename, 'utf-8')
    .then((css) => writeFile(outputFilename, matchAndReplaceHexColors(css)))
    .then(() => rl.write('Success! Your CSS hexadecimal colours have been converted to RGB'));
}

function runCSSConverter() {
  requestFilenameInput()
    .then((inputFilename) => requestOutputFilenameInput(inputFilename))
    .then(([inputFilename, outputFilename]) =>
      convertCSSAndWriteToFile(inputFilename, outputFilename || inputFilename)
    )
    .then(() => rl.close())
    .catch((err) => {
      if (err instanceof Error) {
        rl.write(err.message);
      } else {
        rl.write('Something went wrong... Please try again.');
      }

      runCSSConverter();
    })
    .finally(() => rl.close());
}

runCSSConverter();
