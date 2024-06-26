const ASCII_TABLE = {
  ' ': 32,
  '!': 33,
  '"': 34,
  '#': 35,
  $: 36,
  '%': 37,
  '&': 38,
  "'": 39,
  '(': 40,
  ')': 41,
  '*': 42,
  '+': 43,
  ',': 44,
  '-': 45,
  '.': 46,
  '/': 47,
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  ':': 58,
  ';': 59,
  '<': 60,
  '=': 61,
  '>': 62,
  '?': 63,
  '@': 64,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  '[': 91,
  '\\': 92,
  ']': 93,
  '^': 94,
  _: 95,
  '`': 96,
  a: 97,
  b: 98,
  c: 99,
  d: 100,
  e: 101,
  f: 102,
  g: 103,
  h: 104,
  i: 105,
  j: 106,
  k: 107,
  l: 108,
  m: 109,
  n: 110,
  o: 111,
  p: 112,
  q: 113,
  r: 114,
  s: 115,
  t: 116,
  u: 117,
  v: 118,
  w: 119,
  x: 120,
  y: 121,
  z: 122,
  '{': 123,
  '|': 124,
  '}': 125,
  '~': 126,
} as const;

const ASCI_VALUES = Object.values(ASCII_TABLE);

type ASCIIChar = keyof typeof ASCII_TABLE;
export type ASCIICode = (typeof ASCII_TABLE)[ASCIIChar];

function isASCIIChar(char: string): char is ASCIIChar {
  return char in ASCII_TABLE;
}

export function isASCIICode(code: number): code is ASCIICode {
  return ASCI_VALUES.includes(code as ASCIICode);
}

// Non-ASCII chars are treated as spaces.
export function getASCIICode(char: string): ASCIICode {
  return isASCIIChar(char) ? ASCII_TABLE[char] : ASCII_TABLE[' '];
}

export function getASCIIChar(targetASCIICode: number): ASCIIChar {
  for (const [char, asciiCode] of Object.entries(ASCII_TABLE)) {
    if (asciiCode === targetASCIICode && isASCIIChar(char)) return char;
  }

  throw new Error(`${targetASCIICode} is not a supported ASCII character`);
}
export default getASCIICode;
