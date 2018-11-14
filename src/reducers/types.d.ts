import { Action } from 'actions/types';
import { Undefined } from 'javascriptutilities';
import { State } from 'utils';

export type OptionalReducer = (
  state: State.Type,
  action: Action<any>
) => Undefined<State.Type>;
