#include <stdio.h>

#define MAX_TEXT 1000 // maximum length of input text

/**
 * --------------------------------------------------------
 * Edge Cases
 * [x] - Single-line comments
 * [x] - Multi-line comments
 * [ ] - Comments in single-quoted strings
 * [ ] - Comments in double-quoted strings
 */

unsigned int get_text(char text_arr[], unsigned int max_len);
void put_text_slice(char text_arr[], unsigned int start, unsigned int end);

unsigned int get_next_comment_start(char text_arr[], unsigned int start,
                                    unsigned int text_len);
unsigned int get_curr_comment_end(char text_arr[], unsigned int start,
                                  unsigned int text_len);
unsigned int get_next_idx_char(char text_arr[], char target, unsigned int start,
                               unsigned int text_len);

int main() {
  char text[MAX_TEXT];
  unsigned int start_of_next_comment, text_len;
  unsigned int cursor = 0;

  text_len = get_text(text, MAX_TEXT);

  printf("\n\n-> Decommented:\n\n");

  while ((start_of_next_comment =
              get_next_comment_start(text, cursor, text_len)) <= text_len) {
    put_text_slice(text, cursor, start_of_next_comment);

    if (start_of_next_comment == text_len)
      break;

    cursor = get_curr_comment_end(text, start_of_next_comment, text_len) + 1;
  }

  printf("\n");
  return 0;
}

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

void put_text_slice(char text_arr[], unsigned int start, unsigned int end) {
  /*
   * Prints slice of array of characters, inclusive of start but exclusive of
   * end
   */
  while (start < end) {
    putchar(text_arr[start]);
    start++;
  }
}
unsigned int get_next_idx_char(char text_arr[], char target, unsigned int start,
                               unsigned int text_len) {
  /**
   * Returns the index of the next character matching `target` in a char-array
   * starting from index `start`, or the length if target isn't found.
   */
  char c;
  while (start < text_len) {
    c = text_arr[start];

    if (c == target)
      return start;

    start++;
  }

  return start;
}

unsigned int get_next_comment_start(char text_arr[], unsigned int cursor,
                                    unsigned int text_len) {
  /**
   * Returns the index of the next comment starting point in a char-array,
   * beginning from index `start`.
   *
   * If there are no comments found up to `text_len`, `text_len` will be
   * returned instead.
   */

  unsigned int j;
  char next_char;

  while (cursor < text_len) {
    cursor = get_next_idx_char(text_arr, '/', cursor, text_len);

    j = cursor + 1;

    if (j == text_len) {
      return j;
    }

    next_char = text_arr[j];

    if (next_char == '/' || next_char == '*') {
      return cursor;
    }

    cursor = j;
  }

  return text_len;
};

unsigned int get_curr_comment_end(char text_arr[], unsigned int start,
                                  unsigned int text_len) {
  /**
   * Returns the index of the next character in a char-array starting from index
   * `start` that isn't part of a comment, or `start` itself if it does not
   * initiate a comment.
   */

  unsigned int j;
  char current_char, next_char;

  current_char = text_arr[start];

  if (current_char != '/')
    return start; // not a comment

  j = start + 1;

  if (j == text_len)
    return j;

  next_char = text_arr[j];

  if (next_char == '/') { // single-line comment
    return get_next_idx_char(text_arr, '\n', j, text_len);
  }

  if (next_char == '*') { // multi-line comment
    while (current_char != '*' && next_char != '/') {
      start = get_next_idx_char(text_arr, '*', j + 1, text_len);

      if (start == text_len)
        return start;

      j = start + 1;

      if (j == text_len)
        return j;

      current_char = text_arr[start];
      next_char = text_arr[j];
    }
    return j;
  }

  // start only represented a single '/' so not a comment
  return start;
}
