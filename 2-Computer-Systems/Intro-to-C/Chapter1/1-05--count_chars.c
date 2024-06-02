#include <stdio.h>

int main()
{
  long nc; // tracks number of characters

  nc = 0;
  while (getchar() != EOF)
    ++nc;

  /* could be written as the following:

    for (nc = 0; getchar() != EOF; ++nc)
      ;  // this is a null-statement

    It's required as for-loops require at least one consecutive statement
    */

  printf("Number of chars: %ld\n", nc);
}