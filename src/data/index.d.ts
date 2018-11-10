import { NeverProp } from 'javascriptutilities';

export type Vocabulary = NeverProp<
  Readonly<{
    id: unknown;
    user_id: unknown;
    word: string;
    meanings: VocabMeaning[];
  }> &
    DataWithStatus
>;

export type VocabMeaning = NeverProp<
  Readonly<{
    id: unknown;
    user_id: unknown;
    vocab_id: unknown;
    def: string;
    pos?: string;
  }> &
    DataWithStatus
>;

export type Status = 'active' | 'deleted';
export type DataWithStatus = Readonly<{ status: Status }>;
export type Selectable<T> = Readonly<{ label: T; value: T }>;
