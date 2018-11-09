export type Action<T = DefaultActionKey> = import('redux').Action<
  T | DefaultActionKey
> &
  Readonly<{ path: string; payload: unknown }>;

export type DefaultActionKey = 'DIRECT_UPDATE';
