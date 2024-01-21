import { open, readFile } from 'fs/promises';
import getPCapMetadata from './pcap/getPcapMetadata';
import getPacketRecordAtOffset from './packetRecord/getPacketRecordAtOffset';
import { PacketRecord } from './packetRecord/packetRecord';
import isTCPPacket from './packetRecord/utilities/isTCPPacket';
import buildTCPConnectionChain from './analysis/tcp/buildTCPConnectionChain';

const FIRST_PACKET_RECORD_OFFSET = 24;

async function start() {
  const pcapFile = await open('helpfiles/synflood.pcap');
  const pcapBuffer = await readFile(pcapFile);

  const { endianness, subSecondsType, linkLayerProtocol } = getPCapMetadata(pcapBuffer);

  let packetRecordOffset = FIRST_PACKET_RECORD_OFFSET;
  const packetRecords: PacketRecord[] = [];

  while (packetRecordOffset < pcapBuffer.byteLength) {
    const packetRecord = getPacketRecordAtOffset({
      pcapBuffer,
      offset: packetRecordOffset,
      endianness,
      subSecondsType,
      linkLayerProtocol,
    });
    packetRecords.push(packetRecord);
    packetRecordOffset += packetRecord.byteLength;
  }

  const tcpPacketRecords = packetRecords.filter(isTCPPacket);
  const tcpConnectionChain = buildTCPConnectionChain(tcpPacketRecords);

  tcpConnectionChain.forEach((register, addressPair) => {
    console.log('Connections per address pair:', addressPair, register.size);
  });
  pcapFile.close();
}

start();
