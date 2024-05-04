#include <stdio.h>

/* Read single-character input then immediately output that character */
int main() {
  int c; /* we use int because EOF (defined in stdio.h) is a special, hardware dependent
            integer that will generally exceed the capacity of the char type. Of course, any 
            character is just a bit pattern, so int suffices */

  while((c = getchar()) != EOF)
    putchar(c);
}