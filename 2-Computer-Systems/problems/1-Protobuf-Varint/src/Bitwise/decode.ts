import { VarInt } from '../varint';
import decodeAsBigInt from './decoding/BigInt/decodeAsBigInt';
import decodeAsNumber from './decoding/Number/decodeAsNumber';
import is32BitsOrLess from './decoding/Number/is32BitsOrLess';

function decode(varInt: VarInt): number | bigint {
  if (is32BitsOrLess(varInt)) {
    return decodeAsNumber(varInt);
  }

  return decodeAsBigInt(varInt);
}

export default decode;
