import { open, readFile } from 'fs/promises';
import getPCapMetadata from './pcap/getPcapMetadata';
import getPacketRecordAtOffset from './packetRecord/getPacketRecordAtOffset';
import { PacketRecord } from './packetRecord/packetRecord';
import isTCPPacket from './packetRecord/utilities/isTCPPacket';
import buildTCPConnectionLog from './analysis/tcp/buildTCPConnectionLog';

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
  const tcpConnectionLog = buildTCPConnectionLog(tcpPacketRecords);

  const timingsFile = await open('synAckLatencies.csv', 'w');

  let connectionsSyned = 0;
  let connectionsSynAcked = 0;
  let connectionsAcked = 0;

  tcpConnectionLog.forEach((register, _addressPair) => {
    register.forEach(async (handshakeSequence, _initialSeqNum) => {
      let synSentAt;
      let synAckSentAt;
      if (handshakeSequence.syn) {
        connectionsSyned++;
        synSentAt = handshakeSequence.syn.sentAt;
      }
      if (handshakeSequence.synAck) {
        connectionsSynAcked++;
        synAckSentAt = handshakeSequence.synAck.sentAt;
      }
      if (handshakeSequence.ack) connectionsAcked++;

      if (synSentAt) {
        await timingsFile.write(
          `${synSentAt.toISOString()},${
            synAckSentAt ? synAckSentAt.getTime() - synSentAt.getTime() : ''
          }\n`
        );
      }
    });
  });
  console.log('Connections SYN-ed:', connectionsSyned);
  console.log(
    'Of which SYN-ACK-ed:',
    `${((connectionsSynAcked / connectionsSyned) * 100).toFixed(1)}%`
  );
  console.log('Connections ACKed:', `${connectionsAcked.toFixed(1)}%`);
  console.log('\n=> SYN-ACK latencies saved to `synAckLatency.csv`');
  timingsFile.close();
  pcapFile.close();
}

start();
