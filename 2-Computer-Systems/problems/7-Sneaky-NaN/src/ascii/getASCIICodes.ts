import { getASCIICode } from './asciiTable';

function getASCIICodes(string: string): number[] {
  return string.split('').map(getASCIICode);
}

export default getASCIICodes;
