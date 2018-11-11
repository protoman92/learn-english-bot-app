import { getters as UserGetters } from 'actions/user';
import {
  ActionKey,
  getters as VocabGetters,
  setters as VocabSetters
} from 'actions/vocabulary';
import { Unpacked } from 'javascriptutilities';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

export default function(vocabApi: import('apis').Api['vocabulary']) {
  function* fetchVocabularies(api: typeof vocabApi) {
    try {
      yield put(VocabSetters.setProgress(true));

      const userId: ReturnType<
        typeof UserGetters['getCurrentUserProp']
      > = yield select(UserGetters.getCurrentUserProp, 'id');

      if (!userId.value) {
        yield put(VocabSetters.setVocabularies([]));
      }

      const vocabs: Unpacked<
        ReturnType<typeof api['fetchVocabularies']>
      > = yield call(api.fetchVocabularies, userId.value);

      yield put(VocabSetters.setVocabularies(vocabs));
    } finally {
      yield put(VocabSetters.setProgress(false));
    }
  }

  function* saveVocabularies(api: typeof vocabApi) {
    try {
      yield put(VocabSetters.setProgress(true));

      const userId: ReturnType<
        typeof UserGetters['getCurrentUserProp']
      > = yield select(UserGetters.getCurrentUserProp, 'id');

      if (!userId.value) {
        yield put(VocabSetters.setVocabularies([]));
      }

      const stateVocabs: ReturnType<
        typeof VocabGetters['getAllVocabularies']
      > = yield select(VocabGetters.getAllVocabularies);

      const validVocabs = stateVocabs
        .getOrElse([])
        .filter(vocab => !!vocab)
        .map(vocab => vocab!);

      const updatedVocabs: Unpacked<
        ReturnType<typeof api['saveVocabularies']>
      > = yield call(api.saveVocabularies, {
        user_id: userId.value,
        vocabs: validVocabs
      });

      yield put(VocabSetters.setVocabularies(updatedVocabs));
    } finally {
      yield put(VocabSetters.setProgress(false));
    }
  }

  return function*() {
    yield all([
      takeLatest(ActionKey.FETCH_VOCABULARIES, fetchVocabularies, vocabApi),
      takeLatest(ActionKey.SAVE_VOCABULARIES, saveVocabularies, vocabApi)
    ]);
  };
}
