import process, { stdin, stdout } from 'node:process';

function isSigInt(buffer: Buffer) {
  return buffer.length === 1 && buffer.readUInt8() === 3;
}

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

function initProgram(): void {
  stdout.write('Ready to beep for your boop\n');

  if (stdin.isTTY) {
    stdin.setRawMode(true);
  } else {
    console.log(
      '\nProcess not connected to a TTY',
      "\nYour input is in 'cooked' mode and you'll have to press ENTER",
      'to complete your input commands'
    );
  }
}

function handleDataInput(data: Buffer): void {
  const firstKeyBuffer = stdin.isTTY ? data : data.subarray(0, 1);

  if (isDigit(firstKeyBuffer)) {
    const numKey = parseASCIIDigit(firstKeyBuffer);
    if (numKey) {
      stdout.write(getASCIIBellBuffer(numKey));
      console.log(new Array(numKey).fill('ding').join(' '));
    }
    return;
  }

  if (isSigInt(firstKeyBuffer)) {
    stdin.emit('SIGINT');
    return;
  }
}

function handleSIGINT(): void {
  stdout.write('SIGINT Received! Press any key to exit.\n');
  process.exitCode = 0;
  stdin.removeAllListeners();
}

stdin.on('data', handleDataInput);
stdin.on('SIGINT', handleSIGINT);

initProgram();
