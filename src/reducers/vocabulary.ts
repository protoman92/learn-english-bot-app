import { ActionKey, getters, path } from 'actions/vocabulary';
import { Status } from 'data';
import { OptionalReducer } from './types';

const _deleteVocabulary: OptionalReducer = (state, { payload: index }) => {
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
};

const _: OptionalReducer = (state, action) => {
  switch (action.type) {
    case ActionKey.DELETE_VOCABULARY:
      return _deleteVocabulary(state, action);
  }

  return undefined;
};

export default _;
