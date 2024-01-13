import { Endianness } from '../../pcap/metadata';
import { GetPacketDataAtOffsetArgs } from '../packetRecord';
import { RecordHeader } from './recordHeader';

const EPOCH_SECONDS_REL_OFFSET = 0;
const EPOCH_SUB_SECONDS_REL_OFFSET = EPOCH_SECONDS_REL_OFFSET + 4;
const CAPTURE_LENGTH_REL_OFFSET = EPOCH_SUB_SECONDS_REL_OFFSET + 4;
const ORIGINAL_LENGTH_REL_OFFSET = CAPTURE_LENGTH_REL_OFFSET + 4;
export const RECORD_HEADER_LENGTH = ORIGINAL_LENGTH_REL_OFFSET + 4;

interface GetRecordHeaderAtOffsetArgs extends GetPacketDataAtOffsetArgs {
  endianness: Endianness;
}

const getRecordHeaderAtOffset = ({
  pcapBuffer,
  offset,
  endianness,
}: GetRecordHeaderAtOffsetArgs): RecordHeader => {
  const epochSecondsOffset = offset + EPOCH_SECONDS_REL_OFFSET;
  const epochSubSecondsOffset = offset + EPOCH_SUB_SECONDS_REL_OFFSET;
  const captureLengthOffset = offset + CAPTURE_LENGTH_REL_OFFSET;
  const originalLengthOffset = offset + ORIGINAL_LENGTH_REL_OFFSET;
  if (endianness === 'LE') {
    return {
      epochSeconds: pcapBuffer.readUInt32LE(epochSecondsOffset),
      epochSubSeconds: pcapBuffer.readUInt32LE(epochSubSecondsOffset),
      captureLength: pcapBuffer.readUInt32LE(captureLengthOffset),
      originalLength: pcapBuffer.readUInt32LE(originalLengthOffset),
    };
  }

  return {
    epochSeconds: pcapBuffer.readUInt32BE(epochSecondsOffset),
    epochSubSeconds: pcapBuffer.readUInt32BE(epochSubSecondsOffset),
    captureLength: pcapBuffer.readUInt32BE(captureLengthOffset),
    originalLength: pcapBuffer.readUInt32BE(originalLengthOffset),
  };
};

export default getRecordHeaderAtOffset;
