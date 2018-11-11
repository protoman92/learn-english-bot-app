import { Types } from 'javascriptutilities';
import { CombinedState } from 'reducers';

export function extractMainState(state: CombinedState | CombinedState['main']) {
  if (Types.isInstance<CombinedState>(state, 'main', 'router')) {
    return state.main;
  }

  return state;
}
