import { NeverProp } from 'javascriptutilities';

export type Vocabulary = Readonly<
  NeverProp<{ id: unknown; word: string; meanings: VocabMeaning }>
>;

export type VocabMeaning = Readonly<
  NeverProp<{ id: unknown; vocab_id: unknown; def: string; pos?: string }>
>;

export type Status = 'active' | 'deleted';
export type DataWithStatus = Readonly<{ status: Status }>;
