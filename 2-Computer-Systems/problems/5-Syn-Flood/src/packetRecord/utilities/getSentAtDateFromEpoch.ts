import { SubSecondsType } from '../../pcap/metadata';

interface GetSentAtDateFromEpochArgs {
  seconds: number;
  subSeconds: number;
  subSecondsType: SubSecondsType;
}

const getSentAtDateFromEpoch = ({
  seconds,
  subSeconds,
  subSecondsType,
}: GetSentAtDateFromEpochArgs): Date =>
  new Date(seconds * 1000 + subSeconds / (subSecondsType === 'micro' ? 1 : 1000));

export default getSentAtDateFromEpoch;
