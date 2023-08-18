// import { VarInt } from "../varint";

import { VarInt } from '../varint';

function is32BitsOrLess(varInt: VarInt): boolean {
  return varInt.length <= 10;
}

function orderAsBigEndian(varInt: VarInt): VarInt {
  let bigEndianVarInt = '';

  for (let i = 2; i < varInt.length; i += 2) {
    bigEndianVarInt = varInt.slice(i, i + 2) + bigEndianVarInt;
  }

  return `0x${bigEndianVarInt}`;
}

function decode(varInt: VarInt): number | bigint {
  if (is32BitsOrLess(varInt)) {
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

  throw new Error('BigInt not yet implemented');
}

export default decode;
