export function pluralise<Word extends string>(
  quantity: number,
  word: Word
): `${Word}${'s'}` | Word {
  if (quantity > 1) return `${word}s`;

  return word;
}
