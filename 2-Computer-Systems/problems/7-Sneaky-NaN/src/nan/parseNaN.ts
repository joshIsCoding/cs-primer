import { endianness } from 'os';
import { MAX_MANTISSA } from './buildNaN';

const parseNaNAsFloatArray = (nan: number): Float64Array => {
  if (!isNaN(nan)) {
    throw new Error(`'nan' isn't actually NaN: ${nan}`);
  }

  const floatBuffer = new Float64Array(1);
  floatBuffer[0] = nan;

  return floatBuffer;
};

export const parseNaNAsUTF8 = (nan: number): string => {
  const floatBuffer = parseNaNAsFloatArray(nan);
  const signExpMetaBytes =
    endianness() === 'LE'
      ? Buffer.from(floatBuffer.buffer, 6, 2)
      : Buffer.from(floatBuffer.buffer, 0, 2);
  const signExpMetaInt =
    endianness() === 'LE' ? signExpMetaBytes.readUInt16LE(0) : signExpMetaBytes.readUInt16BE(0);
  const mantissaBuffer =
    endianness() === 'LE'
      ? Buffer.from(floatBuffer.buffer, 0, 6)
      : Buffer.from(floatBuffer.buffer, 2, 6);

  const messageLength = signExpMetaInt & 7;
  return mantissaBuffer.toString('utf-8', 0, messageLength);
};

const parseNaN = (nan: number): bigint => {
  const floatBuffer = parseNaNAsFloatArray(nan);
  const bigIntBuffer = new BigInt64Array(floatBuffer.buffer);

  return bigIntBuffer[0] & MAX_MANTISSA;
};

export default parseNaN;
