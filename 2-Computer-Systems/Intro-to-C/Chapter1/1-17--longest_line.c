#include <stdio.h>

#define MAX_LINE 1000
#define UNSIGNED_OVERFLOW 0

int get_line(char line[], int max_len);

void copy(char from[], char to[], int max_len);


int main() {
  char line[MAX_LINE], longest[MAX_LINE]; // current input line initialised to the default increment size
  int len, max; // length of the current line, max length of the longest line
  len = max = 0;

  while ((len = get_line(line, MAX_LINE)) > 0) { // get the next line
    if (len > max) { // if the current line is the longest so far
      max = len; // update the max length
      copy(line, longest, MAX_LINE); // copy the longest line
    }
  }

  if (max > 0) {
    printf("\nLongest line length: %d\n", max);
  } else {
    printf("\nLine length exceeded max unsigned int.\n");
  }
  printf("Contents (truncated to %d chars):\n", MAX_LINE);
  printf("%s", longest); 

  return 0;
}

// Return the line length of an input line and write the string to s, up to the maximum length lim
// The returned length can exceed lim, up to maximum signed int
//
// Lines longer than max signed int will return -1.
int get_line(char s[], int lim) {
  int c; 
  unsigned int i, safe_i;
  safe_i = 0;
  i = 1;

  // stop loop if limit, EOF, newline or length overflow reached
  while (i != UNSIGNED_OVERFLOW && safe_i < lim && (c = getchar()) != EOF && c != '\n') {
    s[safe_i] = c;
    safe_i = i;
    i++;
  }
  if (c == '\n') {
    s[safe_i] = c;
  }

  if (i == UNSIGNED_OVERFLOW) { // length count overflow
    return -1;
  }

  s[safe_i + 1] = '\0'; // the null character; a convention for ending string literals

  return safe_i;
}

void copy(char from[], char to[], int lim) {
  int i;
  i = 0;
  while ((to[i] = from[i]) != '\0' && i < lim)
    i++;
}