import getASCIICodes from './ascii/getASCIICodes';
import getStringFromASCIICodes from './ascii/getStringFromASCIICodes';
import getASCIIFromBitVectorInt from './ascii/bitVector/getASCIIFromBitVectorInt';
import getBitVectorIntFromASCII from './ascii/bitVector/getBitVectorIntFromASCII';
import buildNaN from './nan/buildNaN';
import parseNaN, { parseNaNAsUTF8 } from './nan/parseNaN';
import getUTF8Buffer from './utf8/getUTF8Buffer';

function conceal(message: string): number {
  // const asciiSeq = getASCIICodes(message);
  // const bitVector = getBitVectorIntFromASCII(asciiSeq);
  const messageBuffer = getUTF8Buffer(message);

  return buildNaN(messageBuffer);
}

function extract(nan: number): string {
  // const bitVector = parseNaN(nan);
  // const asciiSeq = getASCIIFromBitVectorInt(bitVector);

  // return getStringFromASCIICodes(asciiSeq);

  return parseNaNAsUTF8(nan);
}

// const testMsg = 'ïœßïœßïœß';
const testMsg = 'smarts';

console.log('Input:  ', `\`${testMsg}\``);
console.log('Encoded:', conceal(testMsg));
console.log('Decoded:', `\`${extract(conceal(testMsg))}\``);

let x = conceal('hello!');
console.log("\nlet x = conceal('hello!')");
console.log('Encoded x:', x);
console.log('typeof x: ', typeof x);

console.log('x + 5:    ', x + 5);
console.log('x / 2:    ', x / 2);
console.log('x += 3;');
x += 3;

console.log('Decoded x:', extract(x));
