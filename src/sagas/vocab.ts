import { ActionKey } from 'actions/vocab';
import { all, takeLatest } from 'redux-saga/effects';

export default function(vocabApi: import('api').API['vocab']) {
  function* fetchVocabularies(api: typeof vocabApi) {
    const vocabs = yield api.getVocabularies();
    console.log(vocabs);
  }

  return function*() {
    yield all([
      takeLatest(ActionKey.FETCH_VOCABS, fetchVocabularies, vocabApi)
    ]);
  };
}
