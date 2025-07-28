import getASCIICode, { isASCIICode } from '../asciiTable';

const getBitVectorIntFromASCII = (asciiSequence: number[]): bigint => {
  if (asciiSequence.length > 7) {
    console.warn('Max sequence length is 7 characters (49 bits); yours will be truncated');
  }

  let bitVector = 0n;
  for (let codeIndex = 6; codeIndex >= 0; codeIndex--) {
    const asciiCode = asciiSequence[codeIndex] ?? getASCIICode(' ');

    if (!isASCIICode(asciiCode)) throw new Error(`Unrecognised ASCII code ${asciiCode}`);

    bitVector |= BigInt(asciiCode) << BigInt((6 - codeIndex) * 7);
  }

  return bitVector;
};

export default getBitVectorIntFromASCII;
