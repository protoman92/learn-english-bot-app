import { Never, NeverProp } from 'javascriptutilities';

type _RawSocialAuthData = Readonly<{ _provider: 'facebook' }>;

export type RawFacebookAuthData = _RawSocialAuthData &
  Readonly<{
    _profile: unknown;
    _token: Readonly<{ accessToken: string; expiresAt: number }>;
  }>;

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
export type AuthResult = Readonly<{ accessToken: string; user: User }>;
export type Status = 'active' | 'deleted';
export type DataWithStatus = Readonly<{ status: Status }>;
export type Selectable<T> = Readonly<{ label: T; value: T }>;
