export type Vocab = Readonly<{ word: string }>;
export type Status = 'active' | 'deleted';
export type DataWithStatus = Readonly<{ status: Status }>;
