function roundDecimal(decimal: number, places: number = 2): number {
  const pow10 = Math.pow(10, places);
  return Math.round(decimal * pow10) / pow10;
}

export default roundDecimal;
