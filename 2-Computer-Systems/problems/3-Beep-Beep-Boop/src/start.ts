import { stdin, stdout } from 'node:process';

function isDigit(buffer: Buffer) {
  return buffer.length === 1 && 48 <= buffer.readUInt8() && 58 >= buffer.readUInt8();
}

function parseASCIIDigit(buffer: Buffer): number | null {
  const digit = buffer.readUint8() - 48;

  if (digit > 9 || digit < 0) return null;

  return digit;
}

function getASCIIBellBuffer(bellCount: number) {
  const byteArray = new Array(bellCount).fill(0x07);

  return Buffer.from(byteArray);
}

stdin.on('data', (buffer) => {
  const firstKeyBuffer = buffer.subarray(0, 1);
  if (isDigit(firstKeyBuffer)) {
    const numKey = parseASCIIDigit(firstKeyBuffer);
    if (numKey) {
      stdout.write(getASCIIBellBuffer(numKey));
      console.log(new Array(numKey).fill('ding').join(' '));
    }
  }
});
