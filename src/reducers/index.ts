import { Action } from 'actions/types';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { State } from 'utils';
import UserReducer from './user';
import VocabReducer from './vocabulary';

export type CombinedState = Readonly<{ main: State.Type; router: RouterState }>;

const allReducers: Array<typeof UserReducer> = [UserReducer, VocabReducer];

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
