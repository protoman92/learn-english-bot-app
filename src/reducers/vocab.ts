import { actions } from 'actions/vocab';
import { Unpacked } from 'javascriptutilities';
import { Reducer } from 'redux';
import { State } from 'utils';

const _: Reducer<State.Type, ReturnType<Unpacked<typeof actions>>> = (
  state = State.just({})
) => {
  return state;
};

export default _;
