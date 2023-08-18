import { VarInt } from '../../../varint';

function is32BitsOrLess(varInt: VarInt): boolean {
  return varInt.length <= 10;
}

export default is32BitsOrLess;
