import getBigIntBitSequence from './Utilities/BinaryEncoding/getBigIntBitSequence';
import getNumberBitSequence from './Utilities/BinaryEncoding/getNumberBitSequence';
import getHexSequenceFromByteSequence from './Utilities/HexEncoding/getHexSequenceFromByteSequence';
import { VarInt } from './Utilities/HexEncoding/hexTypes';
import getVarIntByteSequence from './Utilities/VarInt/getVarIntByteSequence';

function encode(unsignedInteger: number | bigint): VarInt {
  const bits =
    typeof unsignedInteger === 'bigint'
      ? getBigIntBitSequence(unsignedInteger)
      : getNumberBitSequence(unsignedInteger);

  const bytes = getVarIntByteSequence(bits);

  console.log(
    `Encoding ${typeof unsignedInteger} ${unsignedInteger} (${
      bits.length / 8
    } bytes) as a ProBuff Varint (${bytes.length} bytes)`
  );
  return getHexSequenceFromByteSequence(bytes);
}

export default encode;
