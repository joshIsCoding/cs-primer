import { VarInt } from '../../../varint';
import orderAsBigEndian from '../orderAsBigEndian';

function decodeAsNumber(varInt: VarInt): number {
  const bigEndianVarInt = orderAsBigEndian(varInt);
  const varIntNum = parseInt(bigEndianVarInt, 16);

  let bitMask = 127;
  let decodedNum = 0;
  for (let i = 0; i < 4; i++) {
    // A moving 'window' of 7 bits from least to most significant
    const next7Bits = (varIntNum & bitMask) >> i; // rightward shift to ignore continuation bits
    decodedNum |= next7Bits;
    if (i === 3) break; // no mask incrementation needed on final iteration

    bitMask = bitMask << 8;
  }

  return decodedNum;
}

export default decodeAsNumber;
