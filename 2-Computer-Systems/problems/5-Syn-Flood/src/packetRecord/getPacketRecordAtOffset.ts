import { Endianness, SubSecondsType } from '../pcap/metadata';
import getLinkLayerAddressFamily from './linkLayer/getLinkLayerAddressFamily';
import { PacketRecord } from './packetRecord';
import getRecordHeaderAtOffset, {
  RECORD_HEADER_LENGTH,
} from './recordHeader/getRecordHeaderAtOffset';
import getSentAtDateFromEpoch from './utilities/getSentAtDateFromEpoch';

interface GetPacketRecordAtOffsetArgs {
  pcapBuffer: Buffer;
  offset: number;
  endianness: Endianness;
  linkLayerProtocol: number;
  subSecondsType: SubSecondsType;
}

const getPacketRecordAtOffset = ({
  pcapBuffer,
  offset,
  endianness,
  subSecondsType,
  linkLayerProtocol,
}: GetPacketRecordAtOffsetArgs): PacketRecord => {
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
  const addressFamily = getLinkLayerAddressFamily({
    pcapBuffer,
    recordOffset: offset,
    endianness,
    linkLayerProtocol,
  });

  return {
    sentAt,
    addressFamily,
    byteLength: captureLength + RECORD_HEADER_LENGTH,
  };
};

export default getPacketRecordAtOffset;
