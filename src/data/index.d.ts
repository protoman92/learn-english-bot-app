export type Vocabulary = Readonly<{ id: unknown; word: string }>;
export type Status = 'active' | 'deleted';
export type DataWithStatus = Readonly<{ status: Status }>;
