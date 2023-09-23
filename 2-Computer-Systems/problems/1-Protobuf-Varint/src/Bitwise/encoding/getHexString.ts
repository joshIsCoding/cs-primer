import { VarInt } from '../../varint';

function getHexString(bytes: Uint8Array): VarInt {
  let hexStr = '';
  let msbIndex = 0; // position of most significant byte in little endian array
  for (let i = bytes.length - 1; i >= 0; i--) {
    if (bytes[i] !== 0) {
      msbIndex = Math.min(bytes.length - 1, i + 1);
      break;
    }
    continue;
  }
  bytes.slice(0, msbIndex + 1).forEach((uIntByte) => {
    if (uIntByte === 0) return;

    hexStr += uIntByte.toString(16).padStart(2, '0');
  });

  return `0x${hexStr}`;
}

export default getHexString;
