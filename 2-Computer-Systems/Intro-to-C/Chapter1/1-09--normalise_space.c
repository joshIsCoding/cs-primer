#include <stdio.h>

int main()
{
  int c; /* character var */
  short prev_sp; /* flags whether last char was a space */

  c = 0;
  prev_sp = 0;
  while((c = getchar()) != EOF) {
    if (prev_sp == 0 || c != ' ')
      putchar(c);

    if (c == ' ')
      prev_sp = 1;
    else
      prev_sp = 0;
  }
}
