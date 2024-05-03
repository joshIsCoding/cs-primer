import parseHexAsDecimal from './parser/parseHexAsDecimal';
import { HexColor, RGBColor, RGBAColor } from './types/colors';
import roundDecimal from './utils/roundDecimal';
type RGBADigits = [number, number, number, number];

function convertHexColorToRGB(hexColor: HexColor): RGBColor | RGBAColor {
  const hexStr = hexColor.slice(1);
  const rgbDigits: RGBADigits = [0, 0, 0, 1];
  const isShorthand = hexStr.length === 3 || hexStr.length === 4;
  const increment = isShorthand ? 1 : 2;

  for (let i = 0; i < hexStr.length; i += increment) {
    const j = isShorthand ? i : i + 1;
    const hexDigits = `${hexStr[i]}${hexStr[j]}`;
    const decimal = parseHexAsDecimal(hexDigits);
    const rgbIndex = isShorthand ? i : i / 2;

    rgbDigits[rgbIndex] = rgbIndex === 3 ? roundDecimal(decimal / 255) : decimal;
  }

  if (rgbDigits[3] === 1) return `rgb(${rgbDigits[0]} ${rgbDigits[1]} ${rgbDigits[2]})`;

  return `rgb(${rgbDigits[0]} ${rgbDigits[1]} ${rgbDigits[2]} / ${rgbDigits[3]})`;
}

export default convertHexColorToRGB;
