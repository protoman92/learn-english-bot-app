import { Action } from 'actions/types';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { createTransform } from 'redux-persist';
import { State } from 'utils';
import { CombinedState } from './types';
import UserReducer from './user';
import VocabReducer from './vocabulary';

const allReducers: Array<typeof UserReducer> = [UserReducer, VocabReducer];

export function transformStateForPersistence() {
  return createTransform(
    (state, key: keyof CombinedState) => {
      if (key === 'main') {
        return State.just(state).deepClonedObject;
      }

      return state;
    },
    (raw, key: keyof CombinedState) => {
      if (key === 'main') {
        return State.just(raw);
      }

      return raw;
    }
  );
}

export default function(history: History) {
  return combineReducers<CombinedState>({
    main: (state = State.just({}), action: Action) => {
      if (action.path) {
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
    },
    router: connectRouter(history)
  });
}
