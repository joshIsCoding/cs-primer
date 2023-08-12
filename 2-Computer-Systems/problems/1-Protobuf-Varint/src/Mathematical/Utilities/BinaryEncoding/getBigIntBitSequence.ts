import { BitStream } from './bit';

function getBigIntBitSequence(_bigInt: bigint | string): BitStream {
  const bigInt = typeof _bigInt === 'bigint' ? _bigInt : BigInt(_bigInt);

  const bitSequence = bigInt.toString(2);

  if (bitSequence[0] === '-') throw new Error('Only unsigned integers supported');
  if (bitSequence.length > 64) throw new Error('Only 64-bit integers supported');

  return bitSequence.split('').map((bit) => (bit === '0' ? '0' : '1'));
}

export default getBigIntBitSequence;
