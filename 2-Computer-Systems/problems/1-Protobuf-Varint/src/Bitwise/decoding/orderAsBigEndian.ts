import { VarInt } from '../../varint';

function orderAsBigEndian(varInt: VarInt): VarInt {
  let bigEndianVarInt = '';

  for (let i = 2; i < varInt.length; i += 2) {
    bigEndianVarInt = varInt.slice(i, i + 2) + bigEndianVarInt;
  }

  return `0x${bigEndianVarInt}`;
}

export default orderAsBigEndian;
