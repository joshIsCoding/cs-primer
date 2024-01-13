import {
  AddressFamily,
  isBSDAddressFamilyKey,
  linkLayerNullAddressFamilies,
} from './addressFamilies';

const getLinkTypeNullAddressFamily = (addressFamilyKey: number): AddressFamily => {
  if (isBSDAddressFamilyKey(addressFamilyKey)) {
    return linkLayerNullAddressFamilies[addressFamilyKey];
  }
  throw new Error(`Unrecognised protocol key from LINKTYPE_NULL header ${addressFamilyKey}`);
};

export default getLinkTypeNullAddressFamily;
