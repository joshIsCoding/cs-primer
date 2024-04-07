import getASCIICodes from './ascii/getASCIICodes';
import getStringFromASCIICodes from './ascii/getStringFromASCIICodes';
import getASCIIFromBitVectorInt from './ascii/bitVector/getASCIIFromBitVectorInt';
import getBitVectorIntFromASCII from './ascii/bitVector/getBitVectorIntFromASCII';
import buildNaN from './nan/buildNaN';
import parseNaN from './nan/parseNaN';

function conceal(message: string): number {
  const asciiSeq = getASCIICodes(message);
  const bitVector = getBitVectorIntFromASCII(asciiSeq);

  return buildNaN(bitVector);
}

function extract(nan: number): string {
  const bitVector = parseNaN(nan);
  const asciiSeq = getASCIIFromBitVectorInt(bitVector);

  return getStringFromASCIICodes(asciiSeq);
}

const testMsg = 'ïœßïœßïœß';

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
