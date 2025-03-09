#include <stdio.h>
#include "tabstops.h"

#define MAX_TEXT 1000 // maximum length of input text

unsigned int get_text(char text_arr[], unsigned int max_len);
void put_detabbed(char text[], unsigned int len, unsigned int tab_size);
void print_spaces(unsigned int num);

int main() {
  char text[MAX_TEXT];
  unsigned int text_len;

  printf("-> Enter your text:\n");
  text_len = get_text(text, MAX_TEXT);
  printf("-> Detabbing your text...\n\n");
  put_detabbed(text, text_len, TAB_STOPS);
  printf("\n\n-> Done.\n");

  return 0;
}

unsigned int get_text(char text_arr[], unsigned int max_len) {
  unsigned int i;
  int c;
  
  for (i=0; i < max_len; i++) {
    if ((c = getchar()) == EOF) {
      return i;
    }

    text_arr[i] = c;
  }

  return i;
}

void put_detabbed(char text[], unsigned int len, unsigned int tab_size) {
  unsigned int cursor, col_pos, spaces_req;

  col_pos = 0;
  for(cursor = 0; cursor < len; cursor++) {
    if(text[cursor] == '\t') {
      //
      spaces_req = tab_size - (col_pos % tab_size);
      print_spaces(spaces_req);
      col_pos += spaces_req;
    } else {
      putchar(text[cursor]);
      col_pos++;
    }

    if (text[cursor] == '\n'){
      col_pos = 0;
    }
  }
}

void print_spaces(unsigned int num_spaces) {
  unsigned int i;
  for (i = 0; i < num_spaces; i++)
    printf(" ");
}