import { ActionKey, getters, setters } from 'actions/vocabulary';
import { Vocabulary } from 'data';
import { Never, Try } from 'javascriptutilities';
import { all, put, select, takeLatest } from 'redux-saga/effects';

export default function(vocabApi: import('apis').Api['vocabulary']) {
  function* fetchVocabularies(api: typeof vocabApi) {
    const vocabs = yield api.fetchVocabularies();
    yield put(setters.setVocabularies(vocabs));
  }

  function* saveVocabularies(api: typeof vocabApi) {
    const vocabs: Try<Array<Never<Partial<Vocabulary>>>> = yield select(
      getters.getAllVocabularies
    );

    const validVocabs = vocabs
      .getOrElse([])
      .filter(vocab => !!vocab)
      .map(vocab => vocab!);

    const updatedVocabs = yield api.saveVocabularies(validVocabs);
    yield put(setters.setVocabularies(updatedVocabs));
  }

  return function*() {
    yield all([
      takeLatest(ActionKey.FETCH_VOCABULARIES, fetchVocabularies, vocabApi),
      takeLatest(ActionKey.SAVE_VOCABULARIES, saveVocabularies, vocabApi)
    ]);
  };
}
