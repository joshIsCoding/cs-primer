#include <stdio.h>

#define MAX_TEXT 1000 // maximum length of input text

/**
 * TODO
 * Finish `put_decommented_text` putchar loop and debug.
 * --------------------------------------------------------
 * Edge Cases
 * [x] - Single-line comments
 * [x] - Multi-line comments
 * [ ] - Comments in single-quoted strings
 * [ ] - Comments in double-quoted strings
 */

unsigned int get_text(char text_arr[], unsigned int max_len);
void put_decommented_text(char text_arr[], unsigned int text_len);
unsigned int get_next_uncommented_idx(char text_arr[], unsigned int start,
                                      unsigned int text_len);
unsigned int get_next_idx_char(char text_arr[], char target, unsigned int start,
                               unsigned int text_len);
void put_text_slice(char text_arr[], unsigned int start, unsigned int end);

int main() { return 0; }

unsigned int get_text(char text_arr[], unsigned int max_len) {
  /*
   * Fills array of length max_len with characters from stdin until EOF.
   *
   * Returns the length of the captured characters in the array.
   */
  unsigned int i;
  int c;

  for (i = 0; i < max_len; i++) {
    if ((c = getchar()) == EOF) {
      return i;
    }

    text_arr[i] = c;
  }

  return i;
}
unsigned int get_next_idx_char(char text_arr[], char target, unsigned int start,
                               unsigned int text_len) {
  /**
   * Returns the index of the next character matching `target` in a char-array
   * starting from index `start`, or the length if target isn't found.
   */

  unsigned int i;
  char c;
  for (i = start; i < text_len; i++) {
    c = text_arr[i];

    if (c == target)
      return i;
  }

  return i;
}

unsigned int get_next_uncommented_idx(char text_arr[], unsigned int start,
                                      unsigned int text_len) {
  /**
   * Returns the index of the next character in a char-array starting from index
   * `start` that isn't part of a comment, or the length if there is no
   * remaining uncommented text.
   */

  unsigned int i, j;
  char c, d;

  for (i = start; i < text_len; i++) {
    j = i + 1;

    if (j == text_len)
      return i;

    c = text_arr[i];
    d = text_arr[j];

    if (c != '/' ||
        (d != '*' && d != '/')) // definitely not the start of a comment
      return i;

    if (d == '*') { // multi-line comment
      while (c != '*' && d != '/') {
        i = get_next_idx_char(text_arr, '*', j + 1, text_len);
        j = i + 1;

        if (i >= text_len - 1)
          break;

        c = text_arr[i];
        d = text_arr[j];
      }
      return j + 1;
    }

    // single-line comment
    return get_next_idx_char(text_arr, '\n', i + 1, text_len);
  }

  return i;
}

void put_decommented_text(char text_arr[], unsigned int text_len) {
  unsigned int i;

  for (i = 0; i <)
}
