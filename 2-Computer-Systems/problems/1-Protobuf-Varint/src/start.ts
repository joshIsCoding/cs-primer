import bitwiseEncode from './Bitwise/encode';
import decode from './Bitwise/decode';

console.log('Bitwise Encoding ----------------');
console.log(` 1     => ${bitwiseEncode(1)}`);
console.log(` 150   => ${bitwiseEncode(150)}`);
console.log(` 30000 => ${bitwiseEncode(30000)}`);

console.log(` Number-type (32-bit) max => ${bitwiseEncode(2 ** 31 - 1)}`); // Number-type encoding maximum
console.log(` Varint (64-bit) max      => ${bitwiseEncode(BigInt('0xFFFFFFFFFFFFFFFF'))}`);

console.log('\nBitwise Decoding ----------------');

console.log(` 0x01     => ${decode('0x01')}`);
console.log(` 0x9061   => ${decode('0x9601')}`);
console.log(` 0xb0ea01 => ${decode('0xb0ea01')}`);

console.log(` Max number-type decode => ${decode('0xFFFFFFFF')}`); // Number-type decoding maximum

console.log(` Min bigint decode      => ${decode('0x8080808001')}`); // Big int decoding threshold

console.log(` Varint (64-bit) max    => ${decode('0xffffffffffffffffff01')}`); // Var int decoding maximum
