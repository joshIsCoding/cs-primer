#include <stdio.h>

long htoi(char s[]);

int main() {
  char hex1[10] = "0x00000001";
  long int1 = htoi(hex1);

  printf("Hex: %s\nln", hex1);
  printf("Int: %li\n", int1);
  printf("Hax: %lx\n", int1);

  return 0;
}
