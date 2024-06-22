#include <stdio.h>

int main ()
{
  long c_space, c_tab, c_break; // counts of spaces, tabs and line breaks, respectively
  int c; // character variable

  c_space = c_tab = c_break = 0;
  while ((c = getchar()) != EOF) {

  /* IMPORTANT: single-quoted chars express the int ASCII codes for the enclosed character(s)
     They are known as character constants */

    if (c == ' ')
      ++c_space;
  
    if (c == '\t')
      ++c_tab;
  
    if (c == '\n')
      ++c_break;
  }

  printf("\n\nNum spaces: \t%3ld\n", c_space);
  printf("Num tabs: \t%3ld\n", c_tab);
  printf("Num breaks: \t%3ld\n", c_break);
}