#include <assert.h>
#include <stdio.h>

unsigned int bitcount(unsigned int num);
unsigned int perf_bitcount(unsigned int num);
int main() {
  assert(perf_bitcount(0) == 0);
  assert(perf_bitcount(1) == 1);
  assert(perf_bitcount(3) == 2);
  assert(perf_bitcount(8) == 1);
  // harder case:
  assert(perf_bitcount(0xffffffff) == 32);
  printf("OK\n");
}

unsigned int bitcount(unsigned int num) {
  unsigned int count = 0;
  unsigned int mask = 1;

  while (num > 0) {
    count += num & mask;
    num = num >> 1;
  }

  return count;
}

/**
 * This introduces a constant factor improvement by reducing the number of
 * iterations required on average (it offers no improvement when all bits are
 * on)
 */
unsigned int perf_bitcount(unsigned int num) {
  unsigned int count = 0;
  unsigned int prev_num = num; // this is redundant!

  while (num > 0) {
    num &= num - 1;
    if (prev_num != num) { // as is this! for num > 0, num != (num & (num - 1))
      count++;
    }
    prev_num = num;
  }

  return count;
}
