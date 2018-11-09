import { Action } from 'actions/types';
import { combineReducers } from 'redux';
import { State } from 'utils';
import vocab from './vocab';

export type CombinedState = Record<'default' | 'vocab', State.Type>;
export type CombinedReducer = Record<keyof CombinedState, State.Type>;

const _ = combineReducers<CombinedReducer>({
  default: (state = State.just({}), { path, payload, type }: Action) => {
    switch (type) {
      case 'DIRECT_UPDATE':
        return state.updatingValue(path, payload);
    }

    return state;
  },
  vocab
});

export default _;
