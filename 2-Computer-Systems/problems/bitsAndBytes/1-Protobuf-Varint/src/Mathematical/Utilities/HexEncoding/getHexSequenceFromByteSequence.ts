import { VarInt } from '../../../varint';
import { Byte } from '../BinaryEncoding/bit';
import getHexadecimalFromByte from './getHexadecimalFromByte';

function getHexSequenceFromByteSequence(byteSeq: Byte[]): VarInt {
  console.log(byteSeq);
  return `0x${byteSeq.map((byte) => getHexadecimalFromByte(byte)).join('')}`;
}

export default getHexSequenceFromByteSequence;
