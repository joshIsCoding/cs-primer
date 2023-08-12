import { BINARY_HEXADECIMALS } from './Constants';

export type BitQuintuplet = keyof typeof BINARY_HEXADECIMALS;

export type ValueOf<T> = T[keyof T];

export type HexDigit = ValueOf<typeof BINARY_HEXADECIMALS>;
export type HexByte = `${HexDigit}${HexDigit}`;
