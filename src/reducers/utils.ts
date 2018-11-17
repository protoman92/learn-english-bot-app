import { Types } from 'javascriptutilities';
import { CombinedState } from 'reducers/types';

export function extractMainState(state: CombinedState | CombinedState['main']) {
  if (Types.isInstance<CombinedState>(state, 'main', 'router')) {
    return state.main;
  }

  return state;
}
