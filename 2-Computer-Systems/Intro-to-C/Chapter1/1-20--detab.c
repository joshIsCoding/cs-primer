#include <stdio.h>

#define TAB_COLS 4 // the effective number of spaces per tab
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
  put_detabbed(text, text_len, TAB_COLS);
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
  unsigned int i;

  for(i = 0; i < len; i++) {
    if(text[i] == '\t') {
      print_spaces(tab_size);
    } else {
      putchar(text[i]);
    }

  }
}

void print_spaces(unsigned int num_spaces) {
  unsigned int i;
  for (i = 0; i < num_spaces; i++)
    printf(" ");
}