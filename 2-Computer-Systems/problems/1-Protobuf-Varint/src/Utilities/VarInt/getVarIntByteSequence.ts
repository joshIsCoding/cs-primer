import { BitStream, Byte, Bit } from '../BinaryEncoding/bit';

// returns the bytes in little-endian order
function getVarIntByteSequence(bitSequence: BitStream): Byte[] {
  const size = bitSequence.length;

  if (size > 64) throw new Error('Only 64-bit sequences supported');

  const byteSequence: Byte[] = [];

  for (let i = size - 1; i >= 0; i -= 7) {
    const continuationBit: Bit = i > 6 ? '1' : '0';
    // prettier-ignore
    byteSequence.push(`${
      continuationBit
    }${
      bitSequence[i - 6] ?? '0'
    }${
      bitSequence[i - 5] ?? '0'
    }${
      bitSequence[i - 4] ?? '0'
    }${
      bitSequence[i - 3] ?? '0'
    }${
      bitSequence[i - 2] ?? '0' 
    }${
      bitSequence[i - 1] ?? '0'
    }${
      bitSequence[i] ?? '0'
    }`);
  }

  return byteSequence;
}

export default getVarIntByteSequence;
