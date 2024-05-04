#include <stdio.h>

int main()
{
  long nc; // tracks number of characters

  nc = 0;
  while (getchar() != EOF)
    ++nc;

  printf("Number of chars: %ld\n", nc);
}