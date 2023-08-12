import getBigIntBitSequence from './Utilities/BinaryEncoding/getBigIntBitSequence';
import getNumberBitSequence from './Utilities/BinaryEncoding/getNumberBitSequence';
import getHexSequenceFromByteSequence from './Utilities/HexEncoding/getHexSequenceFromByteSequence';
import { VarInt } from './Utilities/HexEncoding/hexTypes';
import { pluralise } from './Utilities/Logging/pluralise';
import getVarIntByteSequence from './Utilities/VarInt/getVarIntByteSequence';

function encode(unsignedInteger: number | bigint): VarInt {
  const bits =
    typeof unsignedInteger === 'bigint'
      ? getBigIntBitSequence(unsignedInteger)
      : getNumberBitSequence(unsignedInteger);

  const bytes = getVarIntByteSequence(bits);

  const numBits = Math.ceil(bits.length / 8);
  console.log(
    `Encoding ${typeof unsignedInteger} ${unsignedInteger} (${numBits} ${pluralise(
      numBits,
      'byte'
    )}) as a ProBuff Varint (${bytes.length} ${pluralise(bytes.length, 'byte')})`
  );
  return getHexSequenceFromByteSequence(bytes);
}

export default encode;
