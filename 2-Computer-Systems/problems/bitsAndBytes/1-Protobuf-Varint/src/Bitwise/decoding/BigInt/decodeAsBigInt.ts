import { VarInt } from '../../../varint';
import orderAsBigEndian from '../orderAsBigEndian';

function decodeAsBigInt(varInt: VarInt): bigint {
  const bigEndianVarInt = orderAsBigEndian(varInt);
  const varIntBigInt = BigInt(bigEndianVarInt);

  let bitMask = BigInt(127);
  let decodedNum = BigInt(0);
  for (let i = BigInt(0); i < 10; i++) {
    // A moving 'window' of 7 bits from least to most significant
    const next7Bits = (varIntBigInt & bitMask) >> i; // rightward shift to ignore continuation bits
    decodedNum |= next7Bits;
    if (i === BigInt(9)) break; // no mask incrementation needed on final iteration

    bitMask = bitMask << BigInt(8);
  }

  return decodedNum;
}

export default decodeAsBigInt;
