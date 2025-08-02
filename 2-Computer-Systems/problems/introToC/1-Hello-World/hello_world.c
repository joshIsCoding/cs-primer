#include <stdio.h>

#define GREETING_LEN 12 // the number of chars required for a nice greeting

int main(int argc, char** argv) {
  unsigned int i;

  printf("Hello, ");
  for (i = 1; i < argc; i++) {
    printf("%s, ", argv[i]);
  }

  printf("and the World!\n");
}
