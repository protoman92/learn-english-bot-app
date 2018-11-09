import { setters } from 'actions/vocabulary';
import { Undefined, Unpacked } from 'javascriptutilities';
import { State } from 'utils';

export default function(
  state: State.Type,
  action: ReturnType<Unpacked<typeof setters>>
): Undefined<State.Type> {
  return undefined;
}
