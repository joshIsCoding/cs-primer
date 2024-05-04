#include <stdio.h>

/* Prints a table of values reflecting the corresponding temperatures in degrees
   Fahrenheit and Celsius */
int main() {
  int fahren, celsius; // temperature values in fahrenheit and celsius
  int lower, upper, step;

  lower = 0; // lower bound for fahrenheit
  upper = 300; // upper bound for fahrenheit
  step = 20; // increment for each row of table

  fahren = lower;

  printf("Fahrenheit - Celsius (%dF to %dF)\n", lower, upper);
  printf("---------------------------------\n");

  while(fahren <= upper) {
    celsius = 5 * (fahren - 32) / 9;

    printf("%3d\t%3d\n", fahren, celsius);
    fahren += step;
  }
}