#include <stdio.h>

#define MAX_TEXT 1000

int get_text(char text[], unsigned int max_len);
int get_index_next_new_line(char text[], unsigned int line_start, unsigned int text_len);
void print_reversed_line(char text[], unsigned int start, unsigned int end);

int main() {
  char text[MAX_TEXT];
  unsigned int text_len, line_start, line_end;
  line_start = 0;

  text_len = get_text(text, MAX_TEXT);

  printf("\n\n--Reversing lines...\n\n");
  while(line_start < text_len) {
    line_end = get_index_next_new_line(text, line_start, text_len);

    print_reversed_line(text,  line_start,  line_end);
    line_start = line_end + 1;
  }

  return 0;
}

/*
 * Fills a char array with input text up until the end-of-file signifier, or
 * until length `lim` is reached, whichever comes first. Returns the lengh of
 * the text.
 */
int get_text(char char_arr[], unsigned int max_len) {
  unsigned int i;
  int current_char;

  for (i=0; i < max_len; i++) {
    current_char = getchar();

    if (current_char == EOF) {
      return i;
    }

    char_arr[i] = current_char;
  }

  return max_len;
}

/*
 * Returns the index of the next '\n' in a char array, starting from the index of 
 * line_start. The char_arr length must be provided as arr_len.
 */
int get_index_next_new_line(char char_arr[], unsigned int line_start, unsigned int arr_len) {
  unsigned int i, c;

  for (i=line_start; (c = char_arr[i]) != EOF && i < arr_len; i++) {
    if (c == '\n') {
      return i;
    }
  }

  return i;
}


/*
 * Print a slice of characters from line_start to line_end - 1, in reverse, adding a
 * line break at the end.
 */ 
void print_reversed_line(char char_arr[], unsigned int line_start, unsigned int line_end) {
  if (line_end < line_start) { // handle invalid case of end index being less than start
    printf("\n");
    return;
  }

  unsigned int i;
  // skip the newline character at index line_end
  for (i = line_end - 1; i >= line_start; i--) {
    printf("%c", char_arr[i]);

    if (i == 0) { // handle overflow
      break;
    }
  }


  printf("\n");
}
