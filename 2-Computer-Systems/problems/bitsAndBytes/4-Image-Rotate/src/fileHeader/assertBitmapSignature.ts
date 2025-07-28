function assertBitMapSignature(metadata: Buffer): void {
  const sig = metadata.subarray(0, 2);
  if (sig.toString('ascii') === 'BM') return;

  throw new Error('File header signature does not match that of a bitmap');
}

export default assertBitMapSignature;
