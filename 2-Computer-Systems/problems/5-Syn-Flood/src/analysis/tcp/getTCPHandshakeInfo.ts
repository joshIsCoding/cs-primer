import {
  AckTCPSegmentHeader,
  SynAckTCPSegmentHeader,
  SynTCPSegmentHeader,
  TCPSegmentHeader,
} from '../../packetRecord/payload/packetBody/tcp/tcpSegmentHeader';
import { TCPConnectionSequence } from './tcpConnectionChain';

type TCPHandhsakeInfo<
  InitialSequenceNumber = number,
  HandshakeStep = keyof TCPConnectionSequence
> = [InitialSequenceNumber, HandshakeStep];

const isSynPacket = (packetBody: TCPSegmentHeader): packetBody is SynTCPSegmentHeader =>
  packetBody.synState === true && packetBody.ackState === false;

const isSynAckPacket = (packetBody: TCPSegmentHeader): packetBody is SynAckTCPSegmentHeader =>
  packetBody.synState === true && packetBody.ackState === true;

const isAckPacket = (packetBody: TCPSegmentHeader): packetBody is AckTCPSegmentHeader =>
  packetBody.synState === false && packetBody.ackState === true;

const getTCPHandshakeInfo = (packetBody: TCPSegmentHeader): TCPHandhsakeInfo => {
  if (isSynPacket(packetBody)) return [packetBody.sequenceNumber, 'syn'];
  if (isSynAckPacket(packetBody)) return [packetBody.ackNumber - 1, 'synAck'];
  if (isAckPacket(packetBody)) return [packetBody.sequenceNumber - 1, 'ack'];

  throw new Error(`Unsupported TCP handshake packet: ${packetBody}`);
};

export default getTCPHandshakeInfo;
