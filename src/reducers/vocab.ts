import { actions } from 'actions/vocab';
import { Undefined, Unpacked } from 'javascriptutilities';
import { State } from 'utils';

export default function(
  state: State.Type,
  action: ReturnType<Unpacked<typeof actions>>
): Undefined<State.Type> {
  return undefined;
}
