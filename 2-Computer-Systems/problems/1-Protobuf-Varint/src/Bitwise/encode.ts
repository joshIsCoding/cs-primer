import getHexString from './getHexString';
import getVarIntByteArray from './getVarIntByteArray';

function encode(num: number) {
  const varIntBytes = getVarIntByteArray(num);

  return getHexString(varIntBytes);
}

export default encode;
