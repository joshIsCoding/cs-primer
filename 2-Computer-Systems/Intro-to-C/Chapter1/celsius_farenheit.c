#include <stdio.h>

// Fahrenheit constants
#define   LOWER_F   0     /* lower bound */
#define   UPPER_F   300   /* upper bound */
#define   STEP_F    20    /* step size */

// Celsius constants
#define   LOWER_C   -20     /* lower bound */
#define   UPPER_C   150   /* upper bound */
#define   STEP_C    10    /* step size */

/* Prints tables of values reflecting the corresponding temperatures in degrees
   Fahrenheit and Celsius */
int main() {
  float fahren, celsius; // temperature values in fahrenheit and celsius

  fahren = LOWER_F;

  printf("Fahrenheit - Celsius (%dF to %dF)\n", LOWER_F, UPPER_F);
  printf("---------------------------------\n");

  while(fahren <= UPPER_F) {
    celsius = (5.0/9.0) * (fahren - 32.0);

    printf("%3.0f\t%6.1f\n", fahren, celsius);
    fahren += STEP_F;
  }

  /* Print the inverse conversion */

  printf("\n\nCelsius - Fahrenheit (%dC to %dC)\n", UPPER_C, LOWER_C);
  printf("---------------------------------\n");

  for(celsius = UPPER_C; celsius >= LOWER_C; celsius -= STEP_C)
    printf("%3.0f\t%6.1f\n", celsius, (9.0/5.0) * celsius + 32.0);
}