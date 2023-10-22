import { isHexDigit, HEX_DIGITS } from './hexDigits';

function parseHexAsDecimal(_hexNumber: string): number {
  const hexNumber = _hexNumber.toLowerCase();
  if (!isHexDigit(hexNumber)) throw new Error(`Unrecognised hex character${hexNumber}`);

  const singleDigit = HEX_DIGITS[hexNumber];

  return singleDigit;
}

export default parseHexAsDecimal;
