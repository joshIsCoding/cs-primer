import parseHexAsDecimal from './parser/parseHexAsDecimal';

type HexColor = `#${string}`;
type RGBColor = `rgb(${number}, ${number}, ${number})`;
type RGBDigits = [number, number, number];

function convertHexColorToRGB(hexColor: HexColor): RGBColor {
  const hexStr = hexColor.slice(1);
  const rgbDigits: RGBDigits = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    if (rgbDigits[i] !== 0) throw new Error(`Invalid index ${i} for RGB array ${rgbDigits}`);

    const j = 2 * i;
    rgbDigits[i] = parseHexAsDecimal(hexStr.slice(j, j + 2));
  }

  return `rgb(${rgbDigits[0]}, ${rgbDigits[1]}, ${rgbDigits[2]})`;
}

export default convertHexColorToRGB;
