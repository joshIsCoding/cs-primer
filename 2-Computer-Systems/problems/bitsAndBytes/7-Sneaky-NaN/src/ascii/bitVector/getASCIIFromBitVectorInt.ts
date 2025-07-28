import { ASCIICode, isASCIICode } from '../asciiTable';

const MAX_INT_32_BIT = 2 ** 31 - 1;

const getASCIIFromBitVectorInt = (bitVectorInt: bigint): ASCIICode[] => {
  const asciiCodes: ASCIICode[] = [];
  const sevenBitMask = 127n;
  for (let rightShiftIndex = 0; rightShiftIndex < 7; rightShiftIndex++) {
    const asciiCodeBigInt = (bitVectorInt >> BigInt(rightShiftIndex * 7)) & sevenBitMask;
    if (asciiCodeBigInt >= MAX_INT_32_BIT) {
      throw new Error(`Bigint is far too large to be an "ASCII" code: ${asciiCodeBigInt}`);
    }

    const asciiCode = Number(asciiCodeBigInt);
    if (!isASCIICode(asciiCode)) {
      throw new Error(`Unrecognised ASCII code ${asciiCode}`);
    }

    asciiCodes.unshift(asciiCode);
  }

  return asciiCodes;
};

export default getASCIIFromBitVectorInt;
