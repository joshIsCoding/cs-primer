#include <stdio.h>

#define IN        1  // state of being within a word
#define OUT       0  // state of being between words
#define MAX_WORD  15 // maximum word length to be tracked by program

int main() {
  /* Array containing the count of words with a length equal to the array index + 1 */
  int lengths[MAX_WORD];
  /* variables for tracking current char, length of current word, and whether currently within word */
  int i, c, length, in_word;
  int bar_i; // variable to track the length of histogram bars while they are printed
  int max_count; // variable to find the magnitude of the count of the most common word length

  // initialise variables
  length = max_count = 0;
  in_word = OUT;
  for (i = 0; i < MAX_WORD; i++)
    lengths[i] = 0;

  while ((c = getchar()) != EOF) {
    if (
      // Is char a "regex" word char (sequence of latin chars, digits or '-'/'_')?
      (c >= '0' && c <= '9') || // Remember, c is an int representing the ASCII code.
      (c >= 'a' && c <= 'z') || // Providing the letters and digits are contiguous and increasing
      (c >= 'A' && c <= 'Z') || // in the current character set, these >=/<= operations will always
      c == '-' || // indicate whether the character is a latter letter or digit.
      c == '_'    
    ) {
      if (in_word == OUT)
        in_word = IN;

      /* clamp longer lengths to maximum supported length */
      if (length < MAX_WORD)
        length++;

    } else {
      if (in_word == IN)
        /* increment word count at index corresponding to current length */
        lengths[length - 1]++;

      in_word = OUT;
      length = 0;
    }
  }

  // Print simple counts
  printf("\n\nCounts\n\n");
  for (i = 0; i < MAX_WORD; i++)
    printf("Length: %d;\tCount: %d\n", i + 1, lengths[i]); // print word-length axis value

  // Print Histogram
  //
  // Determine largest count (ignoring those into the double digits and beyond, for now)
  for (i = 0; i < MAX_WORD; i++)
    if (max_count < lengths[i] && max_count < 10)
      max_count = lengths[i];

  printf("\n\nHorizontal Histogram\n\n"); // title

  // Print y-axis
   printf(" \t "); // indent to cover span of the x-axis (and the zeroth count)
  for (i = 1; i <= max_count; i++)
    printf(" %d", i); // print the values of the y-axis

  printf("\n");

  printf(" \t"); // indent to cover span of the x-axis
  for (i = 0; i <= max_count; i++)
    printf("--"); // print the axis dividing line

  // Print x-axis and histogram bars
  printf("\n");
  for (i = 0; i < MAX_WORD; i++) {
    printf("%d\t|", i + 1); // print word-length axis value 

    for (bar_i = 0; bar_i < lengths[i]; bar_i++)
      printf("=="); // print bar segment for each word counted with the current word length.

    printf("\n");
  }
}