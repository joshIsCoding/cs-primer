const linkLayerHeaderSizesByProtocol = {
  0: 4,
} as const;

export type LinkLayerProtocol = keyof typeof linkLayerHeaderSizesByProtocol;

export const isLinkLayerProtocol = (protocol: number): protocol is LinkLayerProtocol =>
  protocol in linkLayerHeaderSizesByProtocol;

export const getlinkLayerHeaderSize = (protocol: LinkLayerProtocol): number =>
  linkLayerHeaderSizesByProtocol[protocol];
