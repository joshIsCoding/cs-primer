import { open, readFile } from 'fs/promises';

const LE_MICRO_MAGIC_STRING_UINT = 2712847316;
const BE_MICRO_MAGIC_STRING_UINT = 3569595041;
const LE_NANO_MAGIC_STRING_UINT = 2712812621;
const BE_NANO_MAGIC_STRING_UINT = 1295823521;

type Endianness = 'BE' | 'LE';
type SubSecondsType = 'micro' | 'nano';

const getPCapMetadata = (fileBuffer: Buffer): [Endianness, SubSecondsType] => {
  const magicStringUInt = fileBuffer.readUInt32LE(0);
  switch (magicStringUInt) {
    case LE_MICRO_MAGIC_STRING_UINT:
      return ['LE', 'micro'];
    case BE_MICRO_MAGIC_STRING_UINT:
      return ['BE', 'micro'];
    case LE_NANO_MAGIC_STRING_UINT:
      return ['LE', 'nano'];
    case BE_NANO_MAGIC_STRING_UINT:
      return ['BE', 'nano'];
    default:
      throw new Error(`PCap file has unrecognised magic string ${magicStringUInt.toString(16)}`);
  }
};

const LINK_HEADER_OFFSET = 22;

const getLinkHeaderType = (fileBuffer: Buffer, endianness: Endianness): number => {
  if (endianness === 'BE') {
    return fileBuffer.readUInt16BE(LINK_HEADER_OFFSET);
  } else {
    return fileBuffer.readUInt16LE(LINK_HEADER_OFFSET);
  }
};

async function start() {
  const pcapFile = await open('helpfiles/synflood.pcap');
  const packetStream = await readFile(pcapFile);

  const [fileEndianness, timestampSecondsFormat] = getPCapMetadata(packetStream);
  const linkHeaderType = getLinkHeaderType(packetStream, fileEndianness);

  if (linkHeaderType !== 0) throw new Error(`Unsupported Link Header format ${linkHeaderType}`);

  console.log(linkHeaderType);
  pcapFile.close();
}

start();
