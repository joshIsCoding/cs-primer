export const MAX_MANTISSA = BigInt(2 ** 52 - 1);
const SIGN_AND_EXPONENT = BigInt(2 ** 11 - 1) << 52n;

const buildNaN = (mantissaBits: bigint): number => {
  if (mantissaBits > MAX_MANTISSA) {
    throw new Error(`Mantissa with greater than 52 bits is invalid: ${mantissaBits}`);
  }

  const bigIntBuffer = new BigInt64Array(1);
  bigIntBuffer[0] = SIGN_AND_EXPONENT | (mantissaBits & MAX_MANTISSA);

  const floatBuffer = new Float64Array(bigIntBuffer.buffer);

  return floatBuffer[0];
};

export default buildNaN;
