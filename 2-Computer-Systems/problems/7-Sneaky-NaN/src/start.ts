import getASCIICodes from './ascii/getASCIICodes';
import getStringFromASCIICodes from './ascii/getStringFromASCIICodes';
import getASCIIFromBitVectorInt from './ascii/bitVector/getASCIIFromBitVectorInt';
import getBitVectorIntFromASCII from './ascii/bitVector/getBitVectorIntFromASCII';
import buildNaN from './nan/buildNan';
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

const hey = 'HEYA!';

console.log('Input:', hey);
console.log('Encoded:', encode(hey));
console.log('Decoded:', decode(encode(hey)));

// const nanArray = new Int8Array(8);
// nanArray[0] = -1;
// nanArray[1] = -16;

// nanArray.buffer;

// const buffer = new ArrayBuffer(8);
// const viewBE = new DataView(buffer);
// viewBE.setFloat64(0, Number.NaN, false);

// // []
// // 11110000
// // -(2^7) + 2^6 + 2^5 + 2^4
// console.log(buffer);
