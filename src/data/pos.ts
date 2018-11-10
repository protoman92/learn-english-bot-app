import { Selectable } from 'data';

export const selectablePoS: Array<Selectable<string>> = [
  { label: 'adjective', value: 'adj' },
  { label: 'adverb', value: 'adv' },
  { label: 'conjunction', value: 'conj' },
  { label: 'noun', value: 'n' },
  { label: 'preposition', value: 'prep' },
  { label: 'pronoun', value: 'pron' },
  { label: 'verb', value: 'v' }
].map(item => ({
  ...item,
  label: `${item.label.substr(0, 1).toUpperCase()}${item.label.substr(1)}`
}));
