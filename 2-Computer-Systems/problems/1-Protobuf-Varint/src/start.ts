import bitwiseEncode from './Bitwise/encode';
import decode from './Bitwise/decode';

console.log(` Bitwise Encoding => ${bitwiseEncode(1)}`);
console.log(` Bitwise Encoding => ${bitwiseEncode(150)}`);
console.log(` Bitwise Encoding => ${bitwiseEncode(30000)}`);

console.log(` Bitwise Encoding => ${bitwiseEncode(2 ** 31 - 1)}`); // Number-type encoding maximum

console.log(` Bitwise Decoding => ${decode(bitwiseEncode(1))}`);

console.log(` Bitwise Decoding => ${decode(bitwiseEncode(150))}`);

console.log(` Bitwise Decoding => ${decode(bitwiseEncode(30000))}`);

console.log(` Bitwise Decoding => ${decode('0xFFFFFFFF')}`); // Number-type decoding maximum
