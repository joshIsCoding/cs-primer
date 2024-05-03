interface PacketHeader {
  ipVersion: 4 | 6;
  protocol: number;
  rawSource: number;
  rawDestination: number;
  sourceIP: string;
  destinationIP: string;
  byteLength: number;
}

export default PacketHeader;
