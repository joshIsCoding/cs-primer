import { BitStream } from './bit';

function getNumberBitSequence(unsignedInt: number): BitStream {
  if (!Number.isInteger(unsignedInt) || unsignedInt < 0) {
    throw new Error(`${unsignedInt} must be an unsigned integer`);
  }

  if (unsignedInt === 0) return ['0'];

  const bitSequence: BitStream = [];

  for (let i = unsignedInt; i >= 1; i = Math.floor(i / 2)) {
    console.log(i);
    bitSequence.unshift(i % 2 === 0 ? '0' : '1');
  }

  return bitSequence;
}

export default getNumberBitSequence;
