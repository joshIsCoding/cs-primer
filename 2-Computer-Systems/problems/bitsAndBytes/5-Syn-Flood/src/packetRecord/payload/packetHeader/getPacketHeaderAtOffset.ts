import { AddressFamily } from '../../linkLayer/nullLoopback/addressFamilies';
import { GetPacketDataAtOffsetArgs } from '../../packetRecord';
import getIPV4PacketHeaderAtOffset from './ipv4/getPacketHeaderAtOffset';

interface GetPacketHeaderAtOffsetArgs extends GetPacketDataAtOffsetArgs {
  addressFamily: AddressFamily;
}

const getPacketHeaderAtOffset = ({
  pcapBuffer,
  addressFamily,
  offset,
}: GetPacketHeaderAtOffsetArgs) => {
  switch (addressFamily) {
    case 'IPv4':
      return getIPV4PacketHeaderAtOffset({ pcapBuffer, offset });
    default:
      throw new Error(`Unimplemented address family: ${addressFamily}`);
  }
};

export default getPacketHeaderAtOffset;
