#include <stdio.h>

// Defining magic numbers as constants can be helpful for maintaining large C programs
#define  IN   1  /* within word */
#define  OUT  0 /* between words */

int main() {
  int c; /* character storage */
  char state; /* whether the current char is within or between words */

  state = OUT;
  while((c = getchar()) != EOF) {
    if(c == ' ' || c == '\t' || c == '\n') {
      if (state == IN)
        putchar('\n');
      else
        putchar(c);

      state = OUT;
    } else {
      state = IN;
      putchar(c);
    }
  }
}