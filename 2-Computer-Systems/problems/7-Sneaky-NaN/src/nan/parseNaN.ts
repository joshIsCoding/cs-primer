import { MAX_MANTISSA } from './buildNan';

const parseNaN = (nan: number): bigint => {
  if (!isNaN(nan)) {
    throw new Error(`'nan' isn't actually NaN: ${nan}`);
  }

  const floatBuffer = new Float64Array(1);
  floatBuffer[0] = nan;
  const bigIntBuffer = new BigInt64Array(floatBuffer.buffer);

  return bigIntBuffer[0] & MAX_MANTISSA;
};

export default parseNaN;
