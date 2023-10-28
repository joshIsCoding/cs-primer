import convertHexColorToRGB from '../../convertHexColorToRGB';
import { isHexColor } from '../../types/colors';
import HEX_COLOR_PATTERN from './pattern';

const HEX_COLOR_REGEX = new RegExp(HEX_COLOR_PATTERN, 'g');

function replaceColor(color: string) {
  if (!isHexColor(color)) {
    throw new Error(`Matcher error: colour ${color} is not a recognised hex colour`);
  }

  return convertHexColorToRGB(color);
}

export function matchAndReplaceHexColors(css: string): string {
  return css.replace(HEX_COLOR_REGEX, replaceColor);
}
