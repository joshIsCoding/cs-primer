#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

#define COMPLETE_ALPHA_SET 67108863 /* 2^26 - */

bool ispangram(char *s) {
  // A bit vector with 26 significant bits, where each represents inclusion in
  // the english alphabet
  unsigned long alpha_set = 0;
  // alpha_index is a value where 1 <= alpha_index <= 26 representing the
  // corresponding case-normalsed letter of the english alphabet.
  unsigned int i = 0, c = 0, alpha_index = 0;

  while ((c = s[i]) != '\n' && c != '\0') {
    i++;

    if (c >= 'a' && c <= 'z') {
      alpha_index = (c - 'a');
    } else if (c >= 'A' && c <= 'Z') {
      alpha_index = (c - 'A');
    } else {
      continue;
    }
    alpha_set |= (1 << alpha_index);

    if (alpha_set == COMPLETE_ALPHA_SET) {
      return true;
    }
  }

  return false;
}

int main() {
  size_t len;
  ssize_t read;
  char *line = NULL;
  while ((read = getline(&line, &len, stdin)) != -1) {
    if (ispangram(line))
      printf("%s", line);
  }

  if (ferror(stdin))
    fprintf(stderr, "Error reading from stdin");

  free(line);
  fprintf(stderr, "ok\n");
}
