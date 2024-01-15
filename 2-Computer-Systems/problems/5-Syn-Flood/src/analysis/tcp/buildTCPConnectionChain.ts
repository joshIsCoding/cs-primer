import { PacketRecord } from '../../packetRecord/packetRecord';
import { TCPSegmentHeader } from '../../packetRecord/payload/packetBody/tcp/tcpSegmentHeader';
import { Address, AddressPairKey } from './tcpConnectionChain';

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
): Map<AddressPairKey, PacketRecord[]> => {
  const connectionChain = new Map<AddressPairKey, PacketRecord[]>();
  packets.forEach((packet) => {
    const addressPairKey = getAddressPairKey(packet);
    const priorPackets = connectionChain.get(addressPairKey) ?? [];
    connectionChain.set(addressPairKey, [...priorPackets, packet]);
  });

  return connectionChain;
};

export default buildTCPConnectionChain;
