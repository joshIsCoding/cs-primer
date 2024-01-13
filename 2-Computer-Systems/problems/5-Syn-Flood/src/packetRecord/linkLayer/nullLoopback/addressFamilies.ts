export const linkLayerNullAddressFamilies = {
  2: 'IPv4', // AF_INET
  24: 'IPv6', // AF_INET6...
  28: 'IPv6',
  30: 'IPv6',
  7: 'OSI',
  23: 'IPX',
} as const;

export type BSDAddressFamilyKey = keyof typeof linkLayerNullAddressFamilies;
export type AddressFamily = (typeof linkLayerNullAddressFamilies)[BSDAddressFamilyKey];

export const isBSDAddressFamilyKey = (protocolNum: number): protocolNum is BSDAddressFamilyKey =>
  protocolNum in linkLayerNullAddressFamilies;
