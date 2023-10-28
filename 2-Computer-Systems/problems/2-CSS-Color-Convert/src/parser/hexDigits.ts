export const HEX_DIGITS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
} as const;

type HexDigit = keyof typeof HEX_DIGITS;

export function isHexDigit(char: string): char is HexDigit {
  return HEX_DIGITS[char as HexDigit] !== undefined;
}
