import { Never } from 'javascriptutilities';

export type Action<
  Type = DefaultActionKey,
  Payload = unknown
> = import('redux').Action<Type | DefaultActionKey> &
  Readonly<{ path: string; payload: Payload }>;

export type DefaultActionKey = 'DIRECT_UPDATE';
