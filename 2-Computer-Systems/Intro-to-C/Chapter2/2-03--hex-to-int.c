#include <ctype.h>
#include <stdio.h>

long htoi(char *s);
int atoi(char c);

int main() {
  char hex1[] = "0x0000000c";
  long int1 = htoi(hex1);

  printf("Hex: %s\n\n", hex1);
  printf("Int: %li\n", int1);
  printf("Hax: %0#10lx\n", int1);

  return 0;
}

long htoi(char s[]) {
  char c;
  unsigned long i = 0;
  long h_int = 0;

  if (s[0] == '0' && (s[1] == 'x' || s[1] == 'X'))
    i = 2;

  for (; (c = s[i]) && c != '\0'; i++)
    h_int = (h_int << 4) | atoi(c);

  return h_int;
}

int atoi(char c) {
  if (isdigit(c))
    return c - '0';

  switch (tolower(c)) {
  case 'a':
    return 10;
  case 'b':
    return 11;
  case 'c':
    return 12;
  case 'd':
    return 13;
  case 'e':
    return 14;
  case 'f':
    return 15;
  }

  return 0;
}