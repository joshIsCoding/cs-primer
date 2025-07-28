const parseIPString = (address: number): string => {
  const ipParts = [];
  const bitMask = 255;
  for (let i = 0; i < 4; i++) {
    ipParts.unshift(address & bitMask);
    address = address >> 8;
  }

  return ipParts.join('.');
};

export default parseIPString;
