import { AddressFamily } from './linkLayer/nullLoopback/addressFamilies';

export interface GetPacketDataAtOffsetArgs {
  pcapBuffer: Buffer;
  offset: number;
}
export type PacketRecord = {
  sentAt: Date;
  byteLength: number;
  addressFamily: AddressFamily;
};
