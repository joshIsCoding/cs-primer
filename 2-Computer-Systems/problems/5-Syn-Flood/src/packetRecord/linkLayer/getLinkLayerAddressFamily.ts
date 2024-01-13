import { Endianness } from '../../pcap/metadata';
import { RECORD_HEADER_LENGTH } from '../recordHeader/getRecordHeaderAtOffset';
import getLinkTypeNullAddressFamily from './nullLoopback/getLinkTypeNullAddressFamily';

interface getLinkLayerAddressFamilyArgs {
  pcapBuffer: Buffer;
  recordOffset: number;
  linkLayerProtocol: number;
  endianness: Endianness;
}

const getLinkLayerAddressFamily = ({
  pcapBuffer,
  endianness,
  recordOffset,
  linkLayerProtocol,
}: getLinkLayerAddressFamilyArgs) => {
  switch (linkLayerProtocol) {
    case 0:
      const linkLayerHeaderOffset = recordOffset + RECORD_HEADER_LENGTH;
      const addressFamilyKey =
        endianness === 'BE'
          ? pcapBuffer.readUInt32BE(linkLayerHeaderOffset)
          : pcapBuffer.readUInt16LE(linkLayerHeaderOffset);
      return getLinkTypeNullAddressFamily(addressFamilyKey);
    default:
      throw new Error(`Unsupported Link Header format ${linkLayerProtocol}`);
  }
};

export default getLinkLayerAddressFamily;
