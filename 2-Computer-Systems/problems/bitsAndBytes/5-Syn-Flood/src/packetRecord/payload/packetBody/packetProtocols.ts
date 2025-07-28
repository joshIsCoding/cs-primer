import { TCPSegmentHeader } from './tcp/tcpSegmentHeader';
import { UnrecognisedPacket } from './unrecognised/getUnrecognisedPacket';

export interface PacketProtocol {
  protocol: string;
}

export type IpProtocolNumbers = {
  6: TCPSegmentHeader;
  255: UnrecognisedPacket; // reserved number in protocol list @see https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml
};

export type SupportedProtocolNumbers = keyof IpProtocolNumbers;

export type SupportedProtocols = IpProtocolNumbers[keyof IpProtocolNumbers];
