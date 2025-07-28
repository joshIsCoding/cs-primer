#include <stdio.h>

#define GREETING_LEN 12 // the number of chars required for a nice greeting

int main() {
  char greeting[GREETING_LEN] = "HELLO, world";
  unsigned int i;

  for (i = 0; i < GREETING_LEN; i++) {
    putchar(greeting[i]);
  }

  putchar('\n');

  return 0;
}