#include <stdio.h>

#define IN        1  // state of being within a word
#define OUT       0  // state of being between words
#define MAX_WORD  21 // maximum word length to be tracked by program

int main() {
  /* Array containing the count of words with a length equal to the array index */
  int lengths[MAX_WORD];
  /* variables for tracking current char, length of current word, and whether currently within word */
  int i, c, length, in_word;

  // initialise variables
  length = 0;
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
        lengths[length]++;

      in_word = OUT;
      length = 0;
    }
  }

  // Print Histogram
  for (i = 0; i < MAX_WORD; i++)
    printf("\nWord length: %d\t\tCount: %d", i, lengths[i]);
}