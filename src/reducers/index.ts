import { Action } from 'actions/types';
import { Undefined } from 'javascriptutilities';
import { combineReducers } from 'redux';
import { State } from 'utils';
import vocab from './vocab';

const _ = combineReducers({
  default: (
    state: Undefined<State.Type> = State.just({}),
    { path, payload, type }: Action
  ) => {
    switch (type) {
      case 'DIRECT_UPDATE':
        return state.updatingValue(path, payload);
    }

    return state;
  },
  vocab
});

export default _;
