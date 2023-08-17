# Plan

### Varint Basics

The variable-int encoding paradigm is a means of representing  64-bit unsigned integers with variable size, depending on the magnitude of the number. It requires anywhere from 1 to 10 bytes to store the values. This is up to 2 bytes more, in the worst-case, than a 64-bit integer would need, but the assumption is that most numbers will be well below the maximum representable. 

The core principle is that each byte has a most significant bit which flags whether or not the following byte is required to fully represent the number. So when the MSB is 1, the following byte should also be included; when it is zero, no further bytes are required. That means that for each byte, 7 bits contribute to the encoding of the number and 1 bit is reserved as a meta feature of the protocol. Hence, in order to fully represent all 64 bits of the largest numbers, you need 10 x 7 = 70. (9 x 7 comes in just shy at 63).

The other key is that the Varint bytes are ordered as little-endian.

The number 1:
```js
0000 0001
^ msb
```
The number 150:
```js
hex = /x9601
9    6    0    1 
1001 0110 0000 0001
^ msb     ^ msb
// Drop the continuation bits
 001 0110  000 0001
// Re-order as big-endian
 000 0001 001 0110
// Re-group as 4-bit clumps
 0000 0000 1001 0110
// Indices 7654 3210
           ^--^ -^^-
// Deduce the unsigned integer result
2^7 + 2^4 + 2^2 + 2 = 128 + 16 + 4 + 2 = 150 
```

## Requirements

We need an encoder, which takes a literal number and outputs the encoded varint bit vector represented as... (hex?).

### Input to Output

The input will be 8 bytes of unsigned integer, and the bytes will have an unknown sort-order depending on the big-endian or little-endian nature of the machine. 

The output will take the 8 bytes and work through each group of 7 bits, figuring out how many of these groups are required to represent the full number. 





### Challenge Extension - Bitwise Implementation

Using ArrayBuffers, we should be able to handle this problem entirely with binary data operations. We'd need a buffer representing the output with 10 bytes of memory allocated. Then, we'd need bitwise operations to extract the sequences of 7 bits from the input number, mapping these bytes in the buffer.

MAJOR REALISATION

Endianness does not impact bitwise operations. Bitwise operations treat numbers as binary numbers with big-endian sorting.


With a 2-byte number, (big-endian)

```JavaScript
const n = 0000 0000 0000 0001
const m = 0000 0000 0111 1111 // 127 uint

const first_byte = n & m
// 0000 0000 0000 0000 0001 & 0000 0000 0111 1111 = 0000 0000 0000 0001
const pos_continuation = 1000 0000 // 128

const continuation_mask = 2^(7*i) - 1
const needsContinuation = i & !continuation_mask === 0
// 0000 0000 0000 0000 0001 & 1111 1111 1000 0000

```

### Decoding

We need to 'snip' out every 8th bit. Snipping only appears possible with successive combinations of shifts and masks. Essentially, we'll need to be procedural with the bit vector and the mask, such that OR-ing them togther correctly aligns with the original bit positions.

```JavaScript

const vi = 0110 0101 1010 0110;
const m1 =           0111 1111;

const vi = 0110 0101 1010 0110;
const m1 = 0000 0000 0111 1111;
|
const           vi = 0110 0101 1010 0110; >> 8 * n
const m1 =           0111 1111;
<< 7 * n


// step 1
let bv0 = vi & m1
const v0 = vi

// step 2
bv1 = bv0 | (((vi >> 8) & m10) << 7 )
bv1 = bv0 | (((vi & (m10 << 8)) >> 1))
// step 3
bv2 = bv1 | (((vi >> 8) & m1) << 7 )
bv = bv | (((vi & (m2 << 8)) >> 2))
/ step 4
bv = bv | (((vi & (m2 << 16)) >> 3))

```
