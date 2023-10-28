import HEX_COLOR_PATTERN from '../utils/regex/pattern';

export type HexColor = `#${string}`;
export type RGBColor = `rgb(${number}, ${number}, ${number})`;
export type RGBAColor = `rgb(${number}, ${number}, ${number}, ${number})`;

const HEX_COLOR_STRING_REGEX = new RegExp(`^${HEX_COLOR_PATTERN}$`);

export function isHexColor(str: string): str is HexColor {
  return str.match(HEX_COLOR_STRING_REGEX) !== null;
}
