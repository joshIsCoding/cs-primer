import { PacketProtocol } from '../packetProtocols';

export interface TCPSegmentHeader extends PacketProtocol {
  protocol: 'TCP';
  sourcePort: number;
  destinationPort: number;
  sequenceNumber: number;
  ackNumber: number;
  synState: boolean;
  ackState: boolean;
}
