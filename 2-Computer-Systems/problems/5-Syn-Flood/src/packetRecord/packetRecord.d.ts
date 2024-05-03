import { AddressFamily } from './linkLayer/nullLoopback/addressFamilies';
import { SupportedProtocols } from './payload/packetBody/packetProtocols';
import PacketHeader from './payload/packetHeader/header';

export interface GetPacketDataAtOffsetArgs {
  pcapBuffer: Buffer;
  offset: number;
}
export type PacketRecord<T = SupportedProtocols> = {
  sentAt: Date;
  byteLength: number;
  addressFamily: AddressFamily;
  packetHeader: PacketHeader;
  packetBody: T;
};
