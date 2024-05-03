import getHexString from './encoding/getHexString';
import getVarIntByteArray from './encoding/getVarIntByteArray';

const sixtyFourBitMax = BigInt('0xffffffffffffffff');

function encode(num: number | bigint) {
  if (num < 0) throw new Error('Only unsigned integer encoding supported');
  if (num > sixtyFourBitMax) throw new Error('Only integers less than the Uint64max supported');

  const varIntBytes = getVarIntByteArray(num);

  return getHexString(varIntBytes);
}

export default encode;
