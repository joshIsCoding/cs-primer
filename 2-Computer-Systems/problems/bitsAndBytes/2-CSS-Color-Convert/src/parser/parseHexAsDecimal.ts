import { isHexDigit, HEX_DIGITS } from './hexDigits';

function parseHexCharacterAsDecimal(_hexChar: string): number {
  const hexChar = _hexChar.toLowerCase();
  if (!isHexDigit(hexChar)) throw new Error(`Unrecognised hex character ${hexChar}`);

  return HEX_DIGITS[hexChar];
}

function parseHexAsDecimal(hexString: string): number {
  return hexString.split('').reduce(
    (decimalSum, hexChar, i, characters) =>
      // each hex digit represents a multiple of a power of 16, according to its position
      decimalSum + parseHexCharacterAsDecimal(hexChar) * Math.pow(16, characters.length - i - 1),
    0
  );
}

export default parseHexAsDecimal;
