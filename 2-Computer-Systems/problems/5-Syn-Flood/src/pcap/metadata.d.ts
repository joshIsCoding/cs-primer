export type Endianness = 'BE' | 'LE';
export type SubSecondsType = 'micro' | 'nano';

export interface PcapMetadata {
  endianness: Endianness;
  subSecondsType: SubSecondsType;
  linkLayerProtocol: LinkLayerProtocol;
}
