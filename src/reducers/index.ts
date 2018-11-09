import { Action } from 'actions/types';
import { AnyAction, Reducer } from 'redux';
import { State } from 'utils';
import VocabReducer from './vocabulary';

export type CombinedState = State.Type;
const allReducers = [VocabReducer];

const _: Reducer<CombinedState, AnyAction> = (
  state = State.just({}),
  action: Action
) => {
  switch (action.type) {
    case 'DIRECT_UPDATE':
      return state.updatingValue(action.path, action.payload);
  }

  for (const reducer of allReducers) {
    const nextState = reducer(state, action);

    if (nextState) {
      return nextState;
    }

    continue;
  }

  return state;
};

export default _;
