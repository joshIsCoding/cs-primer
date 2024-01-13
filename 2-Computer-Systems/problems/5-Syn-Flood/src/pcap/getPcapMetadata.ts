import {
  LinkLayerProtocol,
  isLinkLayerProtocol,
} from '../packetRecord/linkLayer/linkLayerProtocols';
import { Endianness, PcapMetadata, SubSecondsType } from './metadata';

const LE_MICRO_MAGIC_STRING_UINT = 2712847316;
const BE_MICRO_MAGIC_STRING_UINT = 3569595041;
const LE_NANO_MAGIC_STRING_UINT = 2712812621;
const BE_NANO_MAGIC_STRING_UINT = 1295823521;

const LINK_HEADER_OFFSET = 22;

const getlinkLayerProtocoll = (fileBuffer: Buffer, endianness: Endianness): LinkLayerProtocol => {
  const protocol =
    endianness === 'BE'
      ? fileBuffer.readUInt16BE(LINK_HEADER_OFFSET)
      : fileBuffer.readUInt16LE(LINK_HEADER_OFFSET);

  if (isLinkLayerProtocol(protocol)) return protocol;

  throw new Error(`Unsupported Link Layer protocol ${protocol}`);
};

const parseMagicString = (fileBuffer: Buffer): [Endianness, SubSecondsType] => {
  const magicStringUInt = fileBuffer.readUInt32LE(0);
  switch (magicStringUInt) {
    case LE_MICRO_MAGIC_STRING_UINT:
      return ['LE', 'micro'];
    case BE_MICRO_MAGIC_STRING_UINT:
      return ['BE', 'micro'];
    case LE_NANO_MAGIC_STRING_UINT:
      return ['LE', 'nano'];
    case BE_NANO_MAGIC_STRING_UINT:
      return ['BE', 'nano'];
    default:
      throw new Error(`PCap file has unrecognised magic string ${magicStringUInt.toString(16)}`);
  }
};

const getPcapMetadata = (fileBuffer: Buffer): PcapMetadata => {
  const [endianness, subSecondsType] = parseMagicString(fileBuffer);

  return {
    endianness,
    subSecondsType,
    linkLayerProtocol: getlinkLayerProtocoll(fileBuffer, endianness),
  };
};

export default getPcapMetadata;
