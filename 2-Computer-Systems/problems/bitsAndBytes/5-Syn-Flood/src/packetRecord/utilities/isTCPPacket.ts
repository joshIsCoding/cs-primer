import { PacketRecord } from '../packetRecord';
import { TCPSegmentHeader } from '../payload/packetBody/tcp/tcpSegmentHeader';

const isTCPPacket = (packet: PacketRecord): packet is PacketRecord<TCPSegmentHeader> =>
  packet.packetBody.protocol === 'TCP';

export default isTCPPacket;
