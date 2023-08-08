import { Byte } from '../BinaryEncoding/bit';
import { BINARY_HEXADECIMALS } from './Constants';
import { HexByte } from './hexTypes';
import isBitQuintuplet from './isBitQuintuplet';

function getHexadecimalFromByte(byte: Byte): HexByte {
  const first4Bits = byte.slice(0, 4).join('');
  const second4Bits = byte.slice(4).join('');
  if (!isBitQuintuplet(first4Bits) || !isBitQuintuplet(second4Bits)) {
    throw Error(`Unrecognised bit sequence(s): "${first4Bits}", "${second4Bits}"`);
  }

  return `${BINARY_HEXADECIMALS[first4Bits]}${BINARY_HEXADECIMALS[second4Bits]}`;
}

export default getHexadecimalFromByte;
