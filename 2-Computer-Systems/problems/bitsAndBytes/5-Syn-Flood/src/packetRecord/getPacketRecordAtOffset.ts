import { PcapMetadata } from '../pcap/metadata';
import getLinkLayerAddressFamily from './linkLayer/getLinkLayerAddressFamily';
import { GetPacketDataAtOffsetArgs, PacketRecord } from './packetRecord';
import getPacketHeaderAtOffset from './payload/packetHeader/getPacketHeaderAtOffset';
import getRecordHeaderAtOffset, {
  RECORD_HEADER_LENGTH,
} from './recordHeader/getRecordHeaderAtOffset';
import getSentAtDateFromEpoch from './utilities/getSentAtDateFromEpoch';
import { getlinkLayerHeaderSize } from './linkLayer/linkLayerProtocols';
import getPacketBodyAtOffset from './payload/packetBody/getPacketBodyAtOffset';

export type GetPacketRecordAtOffsetArgs = PcapMetadata & GetPacketDataAtOffsetArgs;

const getPacketRecordAtOffset = ({
  pcapBuffer,
  offset: recordStartOffset,
  endianness,
  subSecondsType,
  linkLayerProtocol,
}: GetPacketRecordAtOffsetArgs): PacketRecord => {
  let offset = recordStartOffset;
  const { epochSeconds, epochSubSeconds, captureLength } = getRecordHeaderAtOffset({
    pcapBuffer,
    endianness,
    offset,
  });
  const sentAt = getSentAtDateFromEpoch({
    seconds: epochSeconds,
    subSeconds: epochSubSeconds,
    subSecondsType,
  });
  offset += RECORD_HEADER_LENGTH;
  const addressFamily = getLinkLayerAddressFamily({
    pcapBuffer,
    offset,
    endianness,
    linkLayerProtocol,
  });

  offset += getlinkLayerHeaderSize(linkLayerProtocol);
  const packetHeader = getPacketHeaderAtOffset({
    pcapBuffer,
    offset,
    addressFamily,
  });

  offset += packetHeader.byteLength;
  const packetBody = getPacketBodyAtOffset({
    pcapBuffer,
    offset,
    packetProtocol: packetHeader.protocol,
  });

  return {
    sentAt,
    addressFamily,
    byteLength: captureLength + RECORD_HEADER_LENGTH,
    packetHeader,
    packetBody,
  };
};

export default getPacketRecordAtOffset;
