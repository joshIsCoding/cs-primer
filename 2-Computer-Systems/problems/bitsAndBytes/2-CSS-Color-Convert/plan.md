## Problem Intro

*In this problem, you will write a short program to convert color declarations in CSS files from hexadecimal to rgb form.*

*The primary objective is to give you more exposure to hexadecimal as an output format for binary data, in a realistic context. You should try to solve the problem in a way where you do the hexadecimal to decimal conversion with minimal use of library functions.*

*Test files are provided. You may want to start with more discrete tests like:*

```python
assert hex_to_rgb('#00ff00') == 'rgb(0, 255, 0)'
```
*Eventually you should be able to run something like:*

```bash
diff <(cat advanced.css | python3 convert.py) advanced_expected.css
```
*and see that there is no output in the diff.*

*As usual, you should watch the first section of the video for more context, and possibly more if you get stuck.*

*Good luck!*

## Steps

1. Produce a function that parses a hexadecimal number into decimal
2. Add a function that takes a hexadecimal color and returns an RGB color
3. Extend the hex-rgb color function to handle the different syntax lengths supported by CSS
  - 3 digits (each is doubled)
  - 4 digits (each is doubled, plus alpha value)
  - 6 digits (standard case)
  - 8 digits (standard case including alpha value)
4. Apply this functionality to modify files in-place
  A. Implement a regex matcher for locating the hex numbers in the file
  B. Modify each match and replace it with the RGB expression.
5. (Extension) Add filename parameter support with a basic CLI 