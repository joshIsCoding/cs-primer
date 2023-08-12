function getVarIntBytesForBigInt(number: bigint): Uint8Array {
  let truncatedNum = number;
  const mask = BigInt(127); // 0111 1111
  const bigZero = BigInt(0);
  const buffer = new Uint8Array(10);

  // for each of the 10 possible var-int bytes
  for (let i = 0; i < buffer.length; i++) {
    const willContinue = (truncatedNum & ~mask) !== bigZero;
    const continuationBit = willContinue ? BigInt(128) : bigZero; // 1000 0000 OR 0000 0000
    const nextVarIntByte = (truncatedNum & mask) | continuationBit;
    buffer[i] = Number(BigInt.asUintN(8, nextVarIntByte));
    if (!willContinue) break;

    truncatedNum = truncatedNum >> BigInt(7);
  }
  return buffer;
}

function getVarIntBytesForNumber(number: number): Uint8Array {
  const buffer = new Uint8Array(5);
  let truncatedNum = number;
  const mask = 127; // 0111 1111

  // for each of the 10 possible var-int bytes
  for (let i = 0; i < buffer.length; i++) {
    const willContinue = (truncatedNum & ~mask) !== 0;
    const continuationBit = willContinue ? 128 : 0; // 1000 0000 OR 0000 0000
    const nextVarIntByte = (truncatedNum & mask) | continuationBit;
    buffer[i] = nextVarIntByte;
    if (!willContinue) break;

    truncatedNum = truncatedNum >> 7;
  }
  return buffer;
}

function getVarIntByteArray(num: number | bigint): Uint8Array {
  // bitwise operations coerce operands into signed 32-bit numbers
  const signed32BitMax = 2 ^ (31 - 1);

  if (typeof num === 'number' && num <= signed32BitMax) return getVarIntBytesForNumber(num);

  return getVarIntBytesForBigInt(BigInt(num));
}

export default getVarIntByteArray;
