#include <stdio.h>

#define IN       1   // state of being within a word
#define OUT      0   // state of being between words
#define MAX_CHAR 255 // maximum character space size to be tracked by program

int main() {
  /* Array to track the frequency of characters appearing from STDIN capped to 1 byte's worth of
    chars. */
  int counts[MAX_CHAR];
  /* variables for tracking current char, length of current word, and whether currently within word */
  int i, c;
  int j; // variable for printing horizontal details in histogram
  int max_count; // variable to find the magnitude of the count of the most common char

  // initialise variables
  max_count = 0;
  for (i = 0; i < MAX_CHAR; i++)
    counts[i] = 0;

  while ((c = getchar()) != EOF) {
    if (c < MAX_CHAR && c >= 0)
      counts[c]++;
  }

  // Print simple counts
  printf("\n\nCounts\n\n");
  for (i = 0; i < MAX_CHAR; i++) {
    if (counts[i] > 0) {
      if (i == '\a') {
        printf("Char: \\a;\tCount: %d\n", counts[i]);
        continue;
      }
      if (i == '\b') {
        printf("Char: \\b;\tCount: %d\n", counts[i]);
        continue;
      }
      if (i == '\f') {
        printf("Char: \\f;\tCount: %d\n", counts[i]);
        continue;
      }
      if (i == '\n') {
        printf("Char: \\n;\tCount: %d\n", counts[i]);
        continue;
      }
      if (i == '\r') {
        printf("Char: \\r;\tCount: %d\n", counts[i]);
        continue;
      }
      if (i == '\t') {
        printf("Char: \\t;\tCount: %d\n", counts[i]);
        continue;
      }
      if (i == '\v') {
        printf("Char: \\v;\tCount: %d\n", counts[i]);
        continue;
      }
      if (i == '\'') {
        printf("Char: \\';\tCount: %d\n", counts[i]);
        continue;
      }
      if (i == '\\' ) {
        printf("Char:  \\;\tCount: %d\n", counts[i]);
        continue;
      }

      printf("Char: %2.c;\tCount: %d\n", i, counts[i]);
    }
  }

  // Print Histogram
  //
  // Determine largest char-count
  for (i = 0; i < MAX_CHAR; i++)
    if (max_count < counts[i])
      max_count = counts[i];

  printf("\n\nHistogram\n\n"); // title

  for (i = max_count; i > 0; i--) {
    printf("%2.d\t| ", i); // print y-axis and value
    for (j = 0; j < MAX_CHAR; j++) {
      // don't allocate x-axis space for zero-frequency chars
      if (counts[j] < 1)
        continue;

      if (counts[j] >= i)
        printf(" || ");
      else
        printf("    ");
    }
    printf("\n");
  }
  printf("  \t -"); // cover y-axis span

  for (j = 0; j < MAX_CHAR; j++) {
    // don't allocate x-axis space for zero-frequency chars
    if (counts[j] < 1)
      continue;

    printf("----"); // print x-axis border
  }
  
  printf("\n");

  printf("  \t  "); // cover y-axis span
  for (j = 0; j < MAX_CHAR; j++) { // print present characters along x-axis
    // don't allocate x-axis space for zero-frequency chars
    if (counts[j] < 1)
      continue;

    if (j == '\a') {
        printf(" \\a ");
        continue;
      }
      if (j == '\b') {
        printf(" \\b ");
        continue;
      }
      if (j == '\f') {
        printf(" \\f ");
        continue;
      }
      if (j == '\n') {
        printf(" \\n ");
        continue;
      }
      if (j == '\r') {
        printf(" \\r ");
        continue;
      }
      if (j == '\t') {
        printf(" \\t ");
        continue;
      }
      if (j == '\v') {
        printf(" \\v ");
        continue;
      }
      if (j == '\'') {
        printf(" \\' ");
        continue;
      }
      if (j == '\\' ) {
        printf("  \\ ");
        continue;
      }
      if (j == ' ' ) {
        printf(" \'\' ");
        continue;
      }

    printf(" %2.c ", j);
  }

  printf("\n");
}