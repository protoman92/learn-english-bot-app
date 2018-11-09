import { ActionKey, getters, setters } from 'actions/vocab';
import { Vocab } from 'data';
import { Never, Try } from 'javascriptutilities';
import { all, put, select, takeLatest } from 'redux-saga/effects';

export default function(vocabApi: import('apis').API['vocab']) {
  function* fetchVocabularies(api: typeof vocabApi) {
    const vocabs = yield api.getVocabularies();
    yield put(setters.setVocabs(vocabs));
  }

  function* saveVocabularies(api: typeof vocabApi) {
    const vocabs: Try<Array<Never<Partial<Vocab>>>> = yield select(
      getters.getAllVocabs
    );

    const validVocabs = vocabs
      .getOrElse([])
      .filter(vocab => !!vocab)
      .map(vocab => vocab!);

    const updatedVocabs = yield api.saveVocabularies(validVocabs);
    yield put(setters.setVocabs(updatedVocabs));
  }

  return function*() {
    yield all([
      takeLatest(ActionKey.FETCH_VOCABS, fetchVocabularies, vocabApi),
      takeLatest(ActionKey.SAVE_VOCABS, saveVocabularies, vocabApi)
    ]);
  };
}
