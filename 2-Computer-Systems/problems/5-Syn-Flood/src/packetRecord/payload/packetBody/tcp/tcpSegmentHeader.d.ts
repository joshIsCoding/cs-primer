import { PacketProtocol } from '../packetProtocols';

interface BaseTCPSegmentHeader extends PacketProtocol {
  protocol: 'TCP';
  sourcePort: number;
  destinationPort: number;
  sequenceNumber: number;
  ackNumber: number;
}

export interface SynTCPSegmentHeader extends BaseTCPSegmentHeader {
  synState: true;
  ackState: false;
}

export interface SynAckTCPSegmentHeader extends BaseTCPSegmentHeader {
  synState: true;
  ackState: true;
}

export interface AckTCPSegmentHeader extends BaseTCPSegmentHeader {
  synState: false;
  ackState: true;
}

interface NonSynAckSegmentHeader extends BaseTCPSegmentHeader {
  synState: false;
  ackState: false;
}

export type TCPSegmentHeader =
  | SynTCPSegmentHeader
  | SynAckTCPSegmentHeader
  | AckTCPSegmentHeader
  | NonSynAckSegmentHeader;
