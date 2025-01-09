#include <stdio.h>

#define MAX_TEXT 1000
#define UNSIGNED_OVERFLOW 0

int get_text(char text[], unsigned int max_len);
void print_long_lines(char text[], unsigned int min_len, unsigned int text_len);
void print_slice(char t[], unsigned int start, unsigned int end);

int main() {
  char text[MAX_TEXT];
  char line[MAX_TEXT];
  unsigned int len;

  len = get_text(text, MAX_TEXT);

  print_long_lines(text, 80, len);

  return 0;
}

/*
  * Fills a char array with input text up until the end-of-file signifier, or
  * until length `lim` is reached, whichever comes first. Returns the lengh of the text.
  */
int get_text(char t[], unsigned int lim) {
  char c;
  unsigned int i;
  while ((c = getchar()) != EOF && i < lim) {
    t[i] = c;
    i++;
  }

  return i;
}

/*
  * Prints the lines of the `t` text parameter which meet or exceed the minimum
  * required length `l_len` parameter, skipping the rest.
  */
void print_long_lines(char t[], unsigned int l_len, unsigned int t_len) {
  unsigned int line_start, line_end, i;
  line_start = line_end = 0;

  printf("Printing lines of at least %d characters only:\n\n", l_len);

  // stop loop if limit, EOF, newline or length overflow reached
  for (i = 0; i < t_len; i++) {
    line_end++;

    if (t[i] == '\n' || t[i] == EOF) {
      if ((line_end - line_start) >= l_len) {
        print_slice(t, line_start, line_end);
      }
      line_start = i + 1;
    }
  }

  printf("\nFinished.\n");
}

void print_slice(char t[], unsigned int start, unsigned int end) {
  if (end < start)
    return;

  unsigned int i;

  for (i = start; i < end; i++)
    printf("%c", t[i]);
}