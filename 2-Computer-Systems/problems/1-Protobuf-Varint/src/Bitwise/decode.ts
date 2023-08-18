import { VarInt } from '../varint';
import decodeAsNumber from './decoding/Number/decodeAsNumber';
import is32BitsOrLess from './decoding/Number/is32BitsOrLess';

function decode(varInt: VarInt): number | bigint {
  if (is32BitsOrLess(varInt)) {
    return decodeAsNumber(varInt);
  }

  throw new Error('BigInt not yet implemented');
}

export default decode;
