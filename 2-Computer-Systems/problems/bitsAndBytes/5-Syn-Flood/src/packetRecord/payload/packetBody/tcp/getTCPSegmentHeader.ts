import { GetPacketDataAtOffsetArgs } from '../../../packetRecord';
import { TCPSegmentHeader } from './tcpSegmentHeader';

type SegmentHeaderSections =
  | keyof Omit<TCPSegmentHeader, 'synState' | 'ackState' | 'protocol'>
  | 'flags';

const tcpSegmentHeaderOffsets: Record<SegmentHeaderSections, number> = {
  sourcePort: 0,
  destinationPort: 2,
  sequenceNumber: 4,
  ackNumber: 8,
  flags: 13,
} as const;

// Multi-byte fields in network byte order
const getTCPSegmentHeader = ({
  pcapBuffer,
  offset,
}: GetPacketDataAtOffsetArgs): TCPSegmentHeader => {
  const flags = pcapBuffer.readUInt8(offset + tcpSegmentHeaderOffsets['flags']);
  const synStateFlag = flags & 2;
  const ackStateFlag = flags & 16;

  return {
    protocol: 'TCP',
    sourcePort: pcapBuffer.readUInt16BE(offset + tcpSegmentHeaderOffsets['sourcePort']),
    destinationPort: pcapBuffer.readUInt16BE(offset + tcpSegmentHeaderOffsets['destinationPort']),
    sequenceNumber: pcapBuffer.readUInt32BE(offset + tcpSegmentHeaderOffsets['sequenceNumber']),
    ackNumber: pcapBuffer.readUInt32BE(offset + tcpSegmentHeaderOffsets['ackNumber']),
    synState: synStateFlag === 2,
    ackState: ackStateFlag === 16,
  };
};

export default getTCPSegmentHeader;
