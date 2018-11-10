import { ActionKey, getters, setters } from 'actions/vocabulary';
import { Unpacked } from 'javascriptutilities';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

export default function(vocabApi: import('apis').Api['vocabulary']) {
  function* fetchVocabularies(api: typeof vocabApi) {
    yield put(setters.setProgress(true));

    const vocabs: Unpacked<
      ReturnType<typeof api['fetchVocabularies']>
    > = yield call(api.fetchVocabularies);

    yield put(setters.setVocabularies(vocabs));
    yield put(setters.setProgress(false));
  }

  function* saveVocabularies(api: typeof vocabApi) {
    yield put(setters.setProgress(true));

    const vocabs: ReturnType<
      typeof getters['getAllVocabularies']
    > = yield select(getters.getAllVocabularies);

    const validVocabs = vocabs
      .getOrElse([])
      .filter(vocab => !!vocab)
      .map(vocab => vocab!);

    const updatedVocabs: Unpacked<
      ReturnType<typeof api['saveVocabularies']>
    > = yield call(api.saveVocabularies, validVocabs);

    yield put(setters.setVocabularies(updatedVocabs));
    yield put(setters.setProgress(false));
  }

  return function*() {
    yield all([
      takeLatest(ActionKey.FETCH_VOCABULARIES, fetchVocabularies, vocabApi),
      takeLatest(ActionKey.SAVE_VOCABULARIES, saveVocabularies, vocabApi)
    ]);
  };
}
