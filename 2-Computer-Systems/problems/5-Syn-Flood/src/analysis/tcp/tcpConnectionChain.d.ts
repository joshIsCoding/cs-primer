interface TCPConnectionSequence {
  syn?: PacketRecord;
  synAck?: PacketRecord;
  ack?: PacketRecord;
}

export type ConnectionSequenceRegister = Map<number, TCPConnectionSequence>;

export type Address<Ip = number, Port = number> = `${Ip}:${Port}`;

// a sorted concatenation of two addresses for grouping any communication between them
export type AddressPairKey = `${Address}-${Address}`;

export type TCPConnectionsRegister = Map<AddressPairKey, ConnectionSequenceRegister>;
