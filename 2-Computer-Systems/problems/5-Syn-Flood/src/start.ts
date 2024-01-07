import { open, readFile } from 'fs/promises';

const LE_MAGIC_STRING_UINT = 2712847316;
const BE_MAGIC_STRING_UINT = 3569595041;

const getPCapEndianess = (fileBuffer: Buffer): 'BE' | 'LE' => {
  const magicStringUInt = fileBuffer.readUInt32LE(0);
  switch (magicStringUInt) {
    case LE_MAGIC_STRING_UINT:
      return 'LE';
    case BE_MAGIC_STRING_UINT:
      return 'BE';
    default:
      throw new Error(`PCap file has unrecognised magic string ${magicStringUInt.toString(16)}`);
  }
};

async function start() {
  const pcapFile = await open('helpfiles/synflood.pcap');
  const packetStream = await readFile(pcapFile);

  const fileEndianness = getPCapEndianess(packetStream);

  console.log(fileEndianness);
  pcapFile.close();
}

start();
