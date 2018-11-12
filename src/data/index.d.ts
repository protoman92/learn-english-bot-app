import { Never, NeverProp } from 'javascriptutilities';

export type Vocabulary = NeverProp<
  Readonly<{
    id: unknown;
    user_id: unknown;
    word: string;
    meanings: Array<Never<Partial<VocabMeaning>>>;
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

export type User = NeverProp<Readonly<{ id: unknown }>>;
export type Status = 'active' | 'deleted';
export type DataWithStatus = Readonly<{ status: Status }>;
export type Selectable<T> = Readonly<{ label: T; value: T }>;
