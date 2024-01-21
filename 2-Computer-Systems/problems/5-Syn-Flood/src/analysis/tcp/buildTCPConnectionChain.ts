import { PacketRecord } from '../../packetRecord/packetRecord';
import { TCPSegmentHeader } from '../../packetRecord/payload/packetBody/tcp/tcpSegmentHeader';
import getTCPHandshakeInfo from './getTCPHandshakeInfo';
import {
  Address,
  AddressPairKey,
  ConnectionSequenceRegister,
  TCPConnectionSequence,
  TCPConnectionsLog,
} from './tcpConnectionLog';

const buildAddress = (ip: number, port: number): Address => `${ip}:${port}`;

type TCPAddressGetter = (packet: PacketRecord<TCPSegmentHeader>) => Address;

const getSourceAddress: TCPAddressGetter = ({ packetBody, packetHeader }) =>
  buildAddress(packetHeader.rawSource, packetBody.sourcePort);

const getDestinationAddress: TCPAddressGetter = ({ packetBody, packetHeader }) =>
  buildAddress(packetHeader.rawDestination, packetBody.destinationPort);

const getAddressPairKey = (packet: PacketRecord<TCPSegmentHeader>): AddressPairKey => {
  const sourceAddress = getSourceAddress(packet);
  const destinationAddress = getDestinationAddress(packet);

  if (sourceAddress < destinationAddress) return `${sourceAddress}-${destinationAddress}`;

  return `${destinationAddress}-${sourceAddress}`;
};

const buildTCPConnectionLog = (packets: PacketRecord<TCPSegmentHeader>[]): TCPConnectionsLog => {
  const connectionLog = new Map<AddressPairKey, ConnectionSequenceRegister>();
  packets.forEach((packet) => {
    const addressPairKey = getAddressPairKey(packet);
    const [initialSequenceNumber, sequenceStep] = getTCPHandshakeInfo(packet.packetBody);
    const priorConnections =
      connectionLog.get(addressPairKey) ?? new Map<number, TCPConnectionSequence>();
    const currentConnection: TCPConnectionSequence =
      priorConnections.get(initialSequenceNumber) ?? {};
    currentConnection[sequenceStep] = packet;
    priorConnections.set(initialSequenceNumber, currentConnection);

    connectionLog.set(addressPairKey, priorConnections);
  });

  return connectionLog;
};

export default buildTCPConnectionLog;
