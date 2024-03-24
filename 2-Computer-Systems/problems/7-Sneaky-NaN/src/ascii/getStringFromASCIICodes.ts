import { getASCIIChar } from './asciiTable';

function getStringFromASCIICodes(codes: number[]): string {
  return codes.map(getASCIIChar).join('');
}

export default getStringFromASCIICodes;
