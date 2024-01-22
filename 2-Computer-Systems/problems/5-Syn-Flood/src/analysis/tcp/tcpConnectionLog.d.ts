import { PacketRecord } from '../../packetRecord/packetRecord';
import { TCPSegmentHeader } from '../../packetRecord/payload/packetBody/tcp/tcpSegmentHeader';
interface TCPConnectionSequence {
  syn?: PacketRecord<TCPSegmentHeader>;
  synAck?: PacketRecord<TCPSegmentHeader>;
  ack?: PacketRecord<TCPSegmentHeader>;
}

export type ConnectionSequenceRegister = Map<number, TCPConnectionSequence>;

export type Address<Ip = number, Port = number> = `${Ip}:${Port}`;

// a sorted concatenation of two addresses for grouping any communication between them
export type AddressPairKey = `${Address}-${Address}`;

export type TCPConnectionsLog = Map<AddressPairKey, ConnectionSequenceRegister>;
