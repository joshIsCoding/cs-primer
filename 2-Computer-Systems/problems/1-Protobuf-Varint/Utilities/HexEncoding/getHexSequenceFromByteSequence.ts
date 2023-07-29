import { Byte } from '../BinaryEncoding/bit';
import { VarInt } from './hexTypes';
import getHexadecimalFromByte from './getHexadecimalFromByte';

function getHexSequenceFromByteSequence(byteSeq: Byte[]): VarInt {
  console.log(byteSeq);
  return `0x${byteSeq.map((byte) => getHexadecimalFromByte(byte)).join('')}`;
}

export default getHexSequenceFromByteSequence;
