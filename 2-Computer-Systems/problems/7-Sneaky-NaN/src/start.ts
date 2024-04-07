import getASCIICodes from './ascii/getASCIICodes';
import getStringFromASCIICodes from './ascii/getStringFromASCIICodes';
import getASCIIFromBitVectorInt from './ascii/bitVector/getASCIIFromBitVectorInt';
import getBitVectorIntFromASCII from './ascii/bitVector/getBitVectorIntFromASCII';
import buildNaN from './nan/buildNaN';
import parseNaN from './nan/parseNaN';

function encode(message: string): number {
  const asciiSeq = getASCIICodes(message);
  const bitVector = getBitVectorIntFromASCII(asciiSeq);

  return buildNaN(bitVector);
}

function decode(nan: number): string {
  const bitVector = parseNaN(nan);
  const asciiSeq = getASCIIFromBitVectorInt(bitVector);

  return getStringFromASCIICodes(asciiSeq);
}

const testMsg = 'ïœßïœßïœß';

console.log('Input:  ', `\`${testMsg}\``);
console.log('Encoded:', encode(testMsg));
console.log('Decoded:', `\`${decode(encode(testMsg))}\``);
