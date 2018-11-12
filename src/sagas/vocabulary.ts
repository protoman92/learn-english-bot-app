import { getters as UserGetters } from 'actions/user';
import {
  ActionKey,
  getters as VocabGetters,
  setters as VocabSetters
} from 'actions/vocabulary';
import { AppApi } from 'apis';
import { Unpacked } from 'javascriptutilities';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { scanActionPredicate } from './utils';

export default function(vocabApi: AppApi['vocabulary']) {
  function* fetchVocabularies(api: typeof vocabApi) {
    try {
      yield put(VocabSetters.setProgress(true));

      const limit: ReturnType<
        typeof VocabGetters['getVocabularyFetchCount']
      > = yield select(VocabGetters.getVocabularyFetchCount);

      const userId: ReturnType<
        typeof UserGetters['getCurrentUserProp']
      > = yield select(UserGetters.getCurrentUserProp, 'id');

      if (!userId.value) {
        yield put(VocabSetters.setVocabularies([]));
      }

      const vocabs: Unpacked<
        ReturnType<typeof api['fetchVocabularies']>
      > = yield call(api.fetchVocabularies, { limit, user_id: userId.value });

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

  function* updateTotalFetchCount(api: typeof vocabApi) {
    yield fetchVocabularies(api);
  }

  return function*() {
    yield all([
      takeLatest(ActionKey.FETCH_VOCABULARIES, fetchVocabularies, vocabApi),
      takeLatest(ActionKey.SAVE_VOCABULARIES, saveVocabularies, vocabApi),
      takeLatest(
        [
          scanActionPredicate(
            VocabSetters.setRowsPerPage,
            ActionKey.SET_ROWS_PER_PAGE,
            (prev, next) => prev < next
          ),
          scanActionPredicate(
            VocabSetters.setPageNumber,
            ActionKey.SET_PAGE_NUMBER,
            (prev, next) => prev < next
          )
        ],
        updateTotalFetchCount,
        vocabApi
      )
    ]);
  };
}
