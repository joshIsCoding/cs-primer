import { GetPacketRecordAtOffsetArgs } from '../getPacketRecordAtOffset';
import getLinkTypeNullAddressFamily from './nullLoopback/getLinkTypeNullAddressFamily';

type getLinkLayerAddressFamilyArgs = Omit<GetPacketRecordAtOffsetArgs, 'subSecondsType'>;

const getLinkLayerAddressFamily = ({
  pcapBuffer,
  endianness,
  offset,
  linkLayerProtocol,
}: getLinkLayerAddressFamilyArgs) => {
  switch (linkLayerProtocol) {
    case 0:
      const addressFamilyKey =
        endianness === 'BE' ? pcapBuffer.readUInt32BE(offset) : pcapBuffer.readUInt32LE(offset);
      return getLinkTypeNullAddressFamily(addressFamilyKey);
    default:
      throw new Error(`Unsupported Link Header format ${linkLayerProtocol}`);
  }
};

export default getLinkLayerAddressFamily;
