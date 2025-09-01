#include <float.h>
#include <limits.h>
#include <stdio.h>

void print_sizes_from_headers(void);
void print_sizes_from_2s_complement(void);

int main() {
  printf("-- Sizes from Headers ----------\n");
  print_sizes_from_headers();
  printf("\n-- Sizes from Derivation -------\n");
  print_sizes_from_2s_complement();
  /**
   * Platform Agnostic Strategies for Derivation
   * - Start at the min-max sizes required by the C spec and increment from
   * there
   * - Incrementing by 1 for integers until overflow should be resilient
   * - Floating point is harder. You'd presumably have to check for infinity,
   * though this isn't guaranteed outside of the IEEE floating point
   * - The increment also isn't obvious due to the impacts of rounding (and the
   *   different rounding modes).
   */
  return 0;
}

void print_sizes_from_headers(void) {
  printf("unsigned short from 0 to %u\n", USHRT_MAX);
  printf("unsigned int   from 0 to %u\n", UINT_MAX);
  printf("unsigned long  from 0 to %lu\n", ULONG_MAX);
  printf("\n");
  printf("signed   short from %d to %d\n", SHRT_MIN, SHRT_MAX);
  printf("signed   int   from %d to %d\n", INT_MIN, INT_MAX);
  printf("signed   long  from %ld to %ld\n", LONG_MIN, LONG_MAX);
  printf("\n");
  printf("char           from %d  to %d\n", CHAR_MIN, CHAR_MAX);
}

void print_sizes_from_2s_complement(void) {
  unsigned short u_shrt_max = -1;
  unsigned u_int_max = -1;
  unsigned long u_long_max = -1;
  signed short shrt_min = (-1 ^ (u_shrt_max >> 1));
  signed int_min = (-1 ^ (u_int_max >> 1));
  signed long long_min = (-1 ^ (u_long_max >> 1));

  printf("unsigned short from 0 to %u\n", u_shrt_max);
  printf("unsigned int   from 0 to %u\n", u_int_max);
  printf("unsigned long  from 0 to %lu\n", u_long_max);
  printf("\n");
  printf("signed   short from %d to %d\n", shrt_min, SHRT_MAX);
  printf("signed   int   from %d to %d\n", int_min, INT_MAX);
  printf("signed   long  from %ld to %ld\n", long_min, LONG_MAX);
  printf("\n");
  printf("char           from %d  to %d\n", CHAR_MIN, CHAR_MAX);
}