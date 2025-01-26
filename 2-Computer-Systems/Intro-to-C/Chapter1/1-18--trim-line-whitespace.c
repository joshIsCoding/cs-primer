#include <stdio.h>

#define MAX_TEXT 1000

int get_text(char text[], unsigned int max_len);
void print_trimmed_lines(char text[], unsigned int len);
void print_line(char text[], unsigned int line_start, unsigned int line_end);

int main() {
  char text[MAX_TEXT];
  unsigned int len;

  len = get_text(text, MAX_TEXT);
  print_trimmed_lines(text, len);

  return 0;
}

/*
 * Fills a char array with input text up until the end-of-file signifier, or
 * until length `lim` is reached, whichever comes first. Returns the lengh of
 * the text.
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
void print_trimmed_lines(char t[], unsigned int len) {
  unsigned int line_start, line_end, i;
  line_start = line_end = 0;

  printf("---------------------------------------------------\n");
  printf("Printing textual lines without trailing whitespace:\n");
  printf("---------------------------------------------------\n");

  for (i = 0; i < len; i++) {

    // track lines with more than just whitespace; ignore trailing whitespace
    if (t[i] != '\t' && t[i] != ' ' && t[i] != '\n' && t[i] != EOF) {
      line_end = i + 1;
    }

    if (t[i] == '\n' || t[i] == EOF) {
      if ((line_end - line_start) > 0) {
        print_line(t, line_start, line_end);
      }
      line_end = line_start = i + 1;
    }
  }

  printf("\nFinished.----------------------------------------\n");
}

void print_line(char t[], unsigned int start, unsigned int end) {
  if (end < start)
    return;

  unsigned int i;

  for (i = start; i < end; i++)
    printf("%c", t[i]);

  printf("\n"); // the original newline char should be omitted by the line bounds
}