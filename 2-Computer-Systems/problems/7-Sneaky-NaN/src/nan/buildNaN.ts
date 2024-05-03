import { endianness } from 'os';

export const MAX_MANTISSA = BigInt(2 ** 52 - 1);
const SIGN_AND_EXPONENT = 2 ** 11 - 1;
const SIGN_AND_EXPONENT_BIG_INT = BigInt(SIGN_AND_EXPONENT) << 52n;

// 0/111 1111 1111/ 1111 / 1111 1111 1111 1111 1111 1111 1111 1111 1111 1111 1111 1111
// s/exp----------/head-/  06        05        04        03        02        01

const buildNaNInUTF8 = (mantissaBits: Buffer): number => {
  const nanBuffer = Buffer.alloc(8);
  const maxMantissa = mantissaBits.subarray(0, 6); // truncate to max. byte length of 6

  const messageByteLength = maxMantissa.byteLength;
  const signExpMetaBytes = (SIGN_AND_EXPONENT << 4) | 8 | (messageByteLength & 7);

  if (endianness() === 'LE') {
    nanBuffer.writeUInt16LE(signExpMetaBytes, 6);
    maxMantissa.copy(nanBuffer, 0);
  } else {
    nanBuffer.writeUInt16BE(signExpMetaBytes, 0);
    maxMantissa.copy(nanBuffer, 2);
  }

  const floatBuffer = new Float64Array(nanBuffer.buffer);

  return floatBuffer[0];
};

const buildNaN = (mantissaBits: bigint | Buffer): number => {
  if (mantissaBits instanceof Buffer) {
    return buildNaNInUTF8(mantissaBits);
  }

  if (mantissaBits > MAX_MANTISSA) {
    throw new Error(`Mantissa with greater than 52 bits is invalid: ${mantissaBits}`);
  }

  const bigIntBuffer = new BigInt64Array(1);
  bigIntBuffer[0] = SIGN_AND_EXPONENT_BIG_INT | (mantissaBits & MAX_MANTISSA);

  const floatBuffer = new Float64Array(bigIntBuffer.buffer);

  return floatBuffer[0];
};

export default buildNaN;
