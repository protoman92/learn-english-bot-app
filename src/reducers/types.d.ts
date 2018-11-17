import { Action } from 'actions/types';
import { RouterState } from 'connected-react-router';
import { Undefined } from 'javascriptutilities';
import { State } from 'utils';

export type OptionalReducer = (
  state: State.Type,
  action: Action<any>
) => Undefined<State.Type>;

export type CombinedState = Readonly<{ main: State.Type; router: RouterState }>;
