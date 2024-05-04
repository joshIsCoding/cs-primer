#include <stdio.h>

/* Prints tables of values reflecting the corresponding temperatures in degrees
   Fahrenheit and Celsius */
int main() {
  float fahren, celsius; // temperature values in fahrenheit and celsius
  int lower, upper, step;

  lower = 0; // lower bound for fahrenheit
  upper = 300; // upper bound for fahrenheit
  step = 20; // increment for each row of table

  fahren = lower;

  printf("Fahrenheit - Celsius (%dF to %dF)\n", lower, upper);
  printf("---------------------------------\n");

  while(fahren <= upper) {
    celsius = (5.0/9.0) * (fahren - 32.0);

    printf("%3.0f\t%6.1f\n", fahren, celsius);
    fahren += step;
  }

  /* Print the inverse conversion */

  lower = -20; // lower bound for celsius
  upper = 150; // upper bound for celsius
  step = 10; // increment for each row

  printf("\n\nCelsius - Fahrenheit (%dC to %dC)\n", lower, upper);
  printf("---------------------------------\n");

  celsius = lower;
  while(celsius <= upper) {
    fahren = (9.0/5.0) * celsius + 32.0;

    printf("%3.0f\t%6.1f\n", celsius, fahren);
    celsius += step;
  }
}