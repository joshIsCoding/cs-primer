interface TCPConnectionSequence {
  syn: PacketRecord;
  synAck?: PacketRecord;
  ack?: PacketRecord;
}

type ConnectionSequenceRegister = {
  [initialSeqNum: number]: TCPConnectionSequence;
};

export type Address<Ip = number, Port = number> = `${Ip}:${Port}`;

// a sorted concatenation of two addresses for grouping any communication between them
export type AddressPairKey = `${Address}-${Address}`;

export type TCPConnectionsRegister = Map<AddressPairKey, ConnectionSequenceRegister>;
