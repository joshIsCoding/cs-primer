#include <stdio.h>

int main() {

  /**
   * Rewrite the following for-loop without such total reliance on operator
   * precedence:
   *
   * for(i = 0; i < lim - 1 && (c = getchar()) != '\n'  && c != EOF; ++i)
   *    s[i] = c;
   */

  int i, lim = 3000;
  char c;
  char s[lim];

  for (i = 0; i < lim - 1; ++i) {
    c = getchar();

    if (c == '\n' || c == EOF) {
      break;
    }

    s[i] = c;
  }

  printf("\nThe string:\n");
  printf("%s\n", s);

  return 0;
}