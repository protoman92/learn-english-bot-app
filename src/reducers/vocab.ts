import Action from 'actions/vocab';
import { Unpacked } from 'javascriptutilities';
import { Reducer } from 'redux';
import { State } from 'utils';

const _: Reducer<State.Type, ReturnType<Unpacked<typeof Action>>> = (
  state = State.just({})
) => {
  return state;
};

export default _;
