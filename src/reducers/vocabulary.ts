import { ActionKey, getters, path, setters } from 'actions/vocabulary';
import { Status } from 'data';
import { Undefined, Unpacked } from 'javascriptutilities';
import { State } from 'utils';

function _deleteVocabulary(
  state: State.Type,
  { payload: index, type }: ReturnType<Unpacked<typeof setters>>
): Undefined<State.Type> {
  if (typeof index === 'number') {
    const deletedStatus: Status = 'deleted';

    return getters
      .getVocabularyItemProp(state, { index, key: 'id' })
      .map(() =>
        state.updatingValue(
          path.vocabularyItemProp({ index, key: 'status' }),
          deletedStatus
        )
      )
      .catchError(() => state.removingArrayIndex(path.allVocabularies, index))
      .value;
  }

  return undefined;
}

const _: typeof _deleteVocabulary = (state, action) => {
  switch (action.type) {
    case ActionKey.DELETE_VOCABULARY:
      return _deleteVocabulary(state, action);
  }

  return undefined;
};

export default _;
