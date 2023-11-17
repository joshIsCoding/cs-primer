import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output, prompt: 'Press any number key > ' });

rl.prompt();

rl.on('line', (input) => {
  console.log(`Beeping ${input.trim()} times`);
}).on('close', () => {
  console.log('\r\nUntil we boop again!');
  process.exit(0);
});
