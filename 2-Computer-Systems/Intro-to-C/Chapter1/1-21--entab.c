#include "tabstops.h"
#include <stdio.h>

#define IN_WHITESPACE                                                          \
  1 // the loop is presently counting 1+ consecutive whitespace chars
#define OUT_WHITESPACE 0  // the loop is no longer within whitespace
#define MAX_TEXT_LEN 1000 // the maximum number of characters supported
#define DEBUG_MODE                                                             \
  0 // When set to 1, the program prints symbolic tabs and spaces for debugging
    // purposes

unsigned int get_text(char text_arr[], unsigned int max_len);
void entab_text(char text_arr[], unsigned int text_len, unsigned int tab_size);
unsigned int handle_whitespace(char text_arr[], unsigned int start,
                               unsigned int last_linebreak,
                               unsigned int text_len, unsigned int tab_size);
void print_whitespace(unsigned int spaces_req, unsigned int col_pos,
                      unsigned int tab_size);
void putspacechar(int space_char, int debug_mode);
unsigned int get_column_pos(unsigned int cursor, unsigned int last_linebreak);

int main() {
  unsigned int text_len;
  char text[MAX_TEXT_LEN];

  text_len = get_text(text, MAX_TEXT_LEN);
  printf("\n\nEntabbed Text:\n\n");
  entab_text(text, text_len, TAB_STOPS);

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

void entab_text(char text_arr[], unsigned int text_len, unsigned int tab_size) {
  unsigned int i /* text index */,
      last_linebreak = 0 /* keep track of linebreaks */;
  int c /* current char */;

  for (i = 0; i < text_len; i++) {
    c = text_arr[i];
    if (c == '\t' || c == ' ') {
      i = handle_whitespace(text_arr, i, last_linebreak, text_len, tab_size);
    } else {
      if (c == '\n') {
        last_linebreak = i;
      }

      putchar(c);
    }
  }
}

unsigned int handle_whitespace(char text_arr[], unsigned int whitespace_start,
                               unsigned int last_linebreak,
                               unsigned int text_len, unsigned int tab_size) {
  /* Works through a slice of whitespace in text_arr until the next
   * non-whitespace character.
   *
   * Returns the index of the last printed whitespace character. */

  unsigned int in_whitespace = IN_WHITESPACE;
  unsigned int text_cursor = whitespace_start;
  unsigned int spaces_req = 0;
  unsigned int first_tab_size, col_pos;
  int c;

  while (text_cursor < text_len && in_whitespace == IN_WHITESPACE) {
    c = text_arr[text_cursor];

    if (c == ' ') {
      spaces_req++;

      text_cursor++;
    } else if (c == '\t') {
      col_pos = get_column_pos(text_cursor, last_linebreak);
      spaces_req += tab_size - (col_pos % tab_size);

      text_cursor++;
    } else {
      in_whitespace = OUT_WHITESPACE;
      text_cursor--; /* ensure the final cursor value is equal to the index of
                      * the last *printed* whitespace char
                      */
    }
  }

  col_pos = get_column_pos(whitespace_start, last_linebreak);
  print_whitespace(spaces_req, col_pos, tab_size);

  return text_cursor;
}

void print_whitespace(unsigned int spaces_req, unsigned int col_pos,
                      unsigned int tab_size) {
  unsigned int spaces_put = 0;
  unsigned int first_tab_size = (tab_size - (col_pos % tab_size));

  if (spaces_req >= first_tab_size && first_tab_size > 1) {
    putspacechar('\t', DEBUG_MODE);
    spaces_put += first_tab_size;
  }

  while (spaces_put < spaces_req) {
    if (spaces_req - spaces_put >= tab_size) {
      putspacechar('\t', DEBUG_MODE);
      spaces_put += tab_size;
    } else {
      putspacechar(' ', DEBUG_MODE);
      spaces_put++;
    }
  }
}

void putspacechar(int space_char, int debug_mode) {
  if (space_char == '\t') {
    if (debug_mode == IN_WHITESPACE) {
      printf("\\t");
    } else {
      putchar('\t');
    }
    return;
  }

  if (space_char == ' ') {
    if (debug_mode == IN_WHITESPACE) {
      printf("\\s");
    } else {
      putchar(' ');
    }
    return;
  }
}

unsigned int get_column_pos(unsigned int cursor, unsigned int last_linebreak) {
  unsigned int col_pos = cursor - last_linebreak;

  if (last_linebreak != 0) {
    /* linebreak characters consume 1 column position, so we must adjust for
     * this */
    col_pos -= 1;
  }

  return col_pos;
}
