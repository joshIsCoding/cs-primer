import { GetPacketDataAtOffsetArgs } from '../../packetRecord';
import { SupportedProtocolNumbers, SupportedProtocols } from './packetProtocols';
import getTCPSegmentHeader from './tcp/getTCPSegmentHeader';
import getUnrecognisedPacket from './unrecognised/getUnrecognisedPacket';

interface GetPacketBodyAtOffsetArgs extends GetPacketDataAtOffsetArgs {
  packetProtocol: number;
}

const supportedProtocolGetters: Record<
  SupportedProtocolNumbers,
  (args: GetPacketDataAtOffsetArgs) => SupportedProtocols
> = {
  6: getTCPSegmentHeader,
  255: getUnrecognisedPacket,
} as const;

const getPacketBodyAtOffset = ({ packetProtocol, ...args }: GetPacketBodyAtOffsetArgs) => {
  if (packetProtocol in supportedProtocolGetters) {
    return supportedProtocolGetters[packetProtocol as SupportedProtocolNumbers](args);
  }

  return getUnrecognisedPacket(args);
};

export default getPacketBodyAtOffset;
