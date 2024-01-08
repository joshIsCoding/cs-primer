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
const FIRST_PACKET_RECORD_OFFSET = LINK_HEADER_OFFSET + 2;

const getLinkHeaderType = (fileBuffer: Buffer, endianness: Endianness): number => {
  if (endianness === 'BE') {
    return fileBuffer.readUInt16BE(LINK_HEADER_OFFSET);
  } else {
    return fileBuffer.readUInt16LE(LINK_HEADER_OFFSET);
  }
};

interface GetSentAtDateFromEpochArgs {
  seconds: number;
  subSeconds: number;
  subSecondsType: SubSecondsType;
}

const getSentAtDateFromEpoch = ({
  seconds,
  subSeconds,
  subSecondsType,
}: GetSentAtDateFromEpochArgs): Date =>
  new Date(seconds * 1000 + subSeconds / (subSecondsType === 'micro' ? 1 : 1000));

const packetTypesByLinktypeNullProtocol = {
  2: 'IPv4',
  24: 'IPv6',
  28: 'IPv6',
  30: 'IPv6',
  7: 'OSI',
  23: 'IPX',
} as const;

type ProtocolType = keyof typeof packetTypesByLinktypeNullProtocol;
type PacketType = (typeof packetTypesByLinktypeNullProtocol)[ProtocolType];

const isProtocolType = (protocolNum: number): protocolNum is ProtocolType =>
  protocolNum in packetTypesByLinktypeNullProtocol;

const getPacketTypeForProtocolType = (protocolType: number): PacketType => {
  if (isProtocolType(protocolType)) {
    return packetTypesByLinktypeNullProtocol[protocolType];
  }
  throw new Error(`Unrecognised protocol type from LINKTYPE_NULL header ${protocolType}`);
};
interface PacketRecord {
  sentAt: Date;
  byteLength: number;
  packetType: PacketType;
}

interface PacketRecordArgs {
  pcapBuffer: Buffer;
  recordOffset: number;
  endianness: Endianness;
  subSecondsType: SubSecondsType;
}

const EPOCH_SECONDS_REL_OFFSET = 0;
const EPOCH_SUB_SECONDS_REL_OFFSET = 4;
const CAPTURE_LENGTH_REL_OFFSET = 8;
const PACKET_HEADER_LENGTH = CAPTURE_LENGTH_REL_OFFSET + 8;

const getPacketRecordAtOffset = ({
  pcapBuffer,
  recordOffset,
  endianness,
  subSecondsType,
}: PacketRecordArgs): PacketRecord => {
  if (endianness === 'LE') {
    return {
      sentAt: getSentAtDateFromEpoch({
        seconds: pcapBuffer.readUInt32LE(recordOffset + EPOCH_SECONDS_REL_OFFSET),
        subSeconds: pcapBuffer.readUInt32LE(recordOffset + EPOCH_SUB_SECONDS_REL_OFFSET),
        subSecondsType,
      }),
      byteLength: pcapBuffer.readUint32LE(recordOffset + CAPTURE_LENGTH_REL_OFFSET),
      packetType: getPacketTypeForProtocolType(
        pcapBuffer.readUint32LE(recordOffset + PACKET_HEADER_LENGTH)
      ),
    };
  }

  return {
    sentAt: getSentAtDateFromEpoch({
      seconds: pcapBuffer.readUInt32BE(recordOffset + EPOCH_SECONDS_REL_OFFSET),
      subSeconds: pcapBuffer.readUInt32BE(recordOffset + EPOCH_SUB_SECONDS_REL_OFFSET),
      subSecondsType,
    }),
    byteLength: pcapBuffer.readUInt32BE(recordOffset + CAPTURE_LENGTH_REL_OFFSET),
    packetType: getPacketTypeForProtocolType(
      pcapBuffer.readUint32BE(recordOffset + PACKET_HEADER_LENGTH)
    ),
  };
};

async function start() {
  const pcapFile = await open('helpfiles/synflood.pcap');
  const pcapBuffer = await readFile(pcapFile);

  const [fileEndianness, timestampSecondsFormat] = getPCapMetadata(pcapBuffer);
  const linkHeaderType = getLinkHeaderType(pcapBuffer, fileEndianness);

  if (linkHeaderType !== 0) throw new Error(`Unsupported Link Header format ${linkHeaderType}`);

  let packetRecordOffset = FIRST_PACKET_RECORD_OFFSET;
  const packetRecords: PacketRecord[] = [];

  while (packetRecordOffset < pcapBuffer.byteLength) {
    const packetRecord = getPacketRecordAtOffset({
      pcapBuffer,
      recordOffset: packetRecordOffset,
      endianness: fileEndianness,
      subSecondsType: timestampSecondsFormat,
    });
    packetRecords.push(packetRecord);
    packetRecordOffset += PACKET_HEADER_LENGTH + packetRecord.byteLength;
  }

  console.log(packetRecords);
  pcapFile.close();
}

start();
