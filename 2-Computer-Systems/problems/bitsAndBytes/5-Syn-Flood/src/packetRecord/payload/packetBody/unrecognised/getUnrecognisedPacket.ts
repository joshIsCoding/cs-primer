import { GetPacketDataAtOffsetArgs } from '../../../packetRecord';
import { PacketProtocol } from '../packetProtocols';

export interface UnrecognisedPacket extends PacketProtocol {
  protocol: 'unknown';
}

const getUnrecognisedPacket = (_args: GetPacketDataAtOffsetArgs): UnrecognisedPacket => ({
  protocol: 'unknown',
});

export default getUnrecognisedPacket;
