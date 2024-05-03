import { BitQuintuplet } from './hexTypes';
import { BINARY_HEXADECIMALS } from './Constants';

function isBitQuintuplet(bitStr: string): bitStr is BitQuintuplet {
  return bitStr in BINARY_HEXADECIMALS;
}

export default isBitQuintuplet;
