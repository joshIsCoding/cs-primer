import { PacketRecord } from '../../packetRecord/packetRecord';
import { TCPSegmentHeader } from '../../packetRecord/payload/packetBody/tcp/tcpSegmentHeader';
import getTCPHandshakeInfo from './getTCPHandshakeInfo';
import {
  Address,
  AddressPairKey,
  ConnectionSequenceRegister,
  TCPConnectionSequence,
  TCPConnectionsRegister,
} from './tcpConnectionChain';

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

const buildTCPConnectionChain = (
  packets: PacketRecord<TCPSegmentHeader>[]
): TCPConnectionsRegister => {
  const connectionChain = new Map<AddressPairKey, ConnectionSequenceRegister>();
  packets.forEach((packet) => {
    const addressPairKey = getAddressPairKey(packet);
    const [initialSequenceNumber, sequenceStep] = getTCPHandshakeInfo(packet.packetBody);
    const priorConnections =
      connectionChain.get(addressPairKey) ?? new Map<number, TCPConnectionSequence>();
    const currentConnection: TCPConnectionSequence =
      priorConnections.get(initialSequenceNumber) ?? {};
    currentConnection[sequenceStep] = packet;
    priorConnections.set(initialSequenceNumber, currentConnection);

    connectionChain.set(addressPairKey, priorConnections);
  });

  return connectionChain;
};

export default buildTCPConnectionChain;
