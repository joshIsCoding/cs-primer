function getVarIntByteArray(num: number): Uint8Array {
  const buffer = new Uint8Array(10); // array of 10 single-byte unsigned integers
  const mask = 127; // 0111 1111 in binary
  let truncatedNum = num;
  // for each of the 10 possible var-int bytes
  for (let i = 0; i < 10; i++) {
    const willContinue = (truncatedNum & ~mask) !== 0;
    const continuationBit = willContinue ? 128 : 0; // 1000 0000 OR 0000 0000
    const nextVarIntByte = (truncatedNum & mask) | continuationBit;
    buffer[i] = nextVarIntByte;
    if (!willContinue) break;

    truncatedNum = truncatedNum >> 7;
  }

  return buffer;
}

export default getVarIntByteArray;
