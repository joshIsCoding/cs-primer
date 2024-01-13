import { AddressFamily } from './linkLayer/nullLoopback/addressFamilies';
import PacketHeader from './payload/packetHeader/header';

export interface GetPacketDataAtOffsetArgs {
  pcapBuffer: Buffer;
  offset: number;
}
export type PacketRecord = {
  sentAt: Date;
  byteLength: number;
  addressFamily: AddressFamily;
} & PacketHeader;
