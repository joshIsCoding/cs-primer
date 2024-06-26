import { GetPacketDataAtOffsetArgs } from '../../../packetRecord';
import PacketHeader from '../header';
import parseIPString from './parseIPString';

const headerOffsets = {
  ipVersion: 0,
  internetHeaderLength: 0, // last 4 bits of first byte
  protocol: 9,
  sourceAddress: 12,
  destinationAddress: 16,
} as const;

const getIPV4PacketHeaderAtOffset = ({
  pcapBuffer,
  offset,
}: GetPacketDataAtOffsetArgs): PacketHeader => {
  const ipVersion = pcapBuffer.readUInt8(offset + headerOffsets['ipVersion']) >> 4;
  if (ipVersion !== 4) throw new Error(`Expected IP version 4, got ${ipVersion}`);

  const internetHeaderLength =
    pcapBuffer.readUInt8(offset + headerOffsets['internetHeaderLength']) & 15;
  const protocol = pcapBuffer.readInt8(offset + headerOffsets['protocol']);
  const rawSource = pcapBuffer.readUInt32BE(offset + headerOffsets['sourceAddress']);
  const rawDestination = pcapBuffer.readUInt32BE(offset + headerOffsets['destinationAddress']);
  const sourceIP = parseIPString(rawSource);
  const destinationIP = parseIPString(rawDestination);

  return {
    ipVersion,
    byteLength: internetHeaderLength * 4,
    protocol,
    rawSource,
    rawDestination,
    sourceIP,
    destinationIP,
  };
};

export default getIPV4PacketHeaderAtOffset;
