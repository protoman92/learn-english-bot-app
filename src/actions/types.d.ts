import { Never } from 'javascriptutilities';

export type Action<Payload = unknown> = import('redux').Action<string> &
  Readonly<{ path: string; payload: Payload }>;
