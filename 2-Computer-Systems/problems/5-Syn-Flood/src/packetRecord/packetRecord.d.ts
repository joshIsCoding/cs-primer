import { AddressFamily } from './linkLayer/nullLoopback/addressFamilies';

export interface PacketRecord {
  sentAt: Date;
  byteLength: number;
  addressFamily: AddressFamily;
}
