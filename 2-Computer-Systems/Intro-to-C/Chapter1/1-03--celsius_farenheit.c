#include <stdio.h>

// Fahrenheit constants
#define   LOWER_F   0     /* lower bound */
#define   UPPER_F   300   /* upper bound */
#define   STEP_F    20    /* step size */

// Celsius constants
#define   LOWER_C   -20     /* lower bound */
#define   UPPER_C   150   /* upper bound */
#define   STEP_C    10    /* step size */

/* 
  Function declarations - note the parameter names need not match those of the definitions. They're
  actually not required at all (just the types are), but adding the names aids documentation
  */

float fahr_to_celsius(float deg_fahr);

float celsius_to_fahr(float deg_cels);

/* Prints tables of values reflecting the corresponding temperatures in degrees
   Fahrenheit and Celsius */
int main() {
  float fahren, celsius; // temperature values in fahrenheit and celsius

  fahren = LOWER_F;

  printf("Fahrenheit - Celsius (%dF to %dF)\n", LOWER_F, UPPER_F);
  printf("---------------------------------\n");

  while(fahren <= UPPER_F) {
    celsius = fahr_to_celsius(fahren);

    printf("%3.0f\t%6.1f\n", fahren, celsius);
    fahren += STEP_F;
  }

  /* Print the inverse conversion */

  printf("\n\nCelsius - Fahrenheit (%dC to %dC)\n", UPPER_C, LOWER_C);
  printf("---------------------------------\n");

  for(celsius = UPPER_C; celsius >= LOWER_C; celsius -= STEP_C) {
    fahren = celsius_to_fahr(celsius);
    printf("%3.0f\t%6.1f\n", celsius, fahren);
  }
}

/* Converts a temperature in degrees Fahrenheit to Celsius */
float fahr_to_celsius(float fahr) {
  return (5.0/9.0) * (fahr - 32.0);
}

/* Converts a temperature in Celsius to Fahrenheit */
float celsius_to_fahr(float cels) {
  return (9.0/5.0) * cels + 32.0;
}