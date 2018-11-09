import { ActionKey, actions } from 'actions/vocab';
import { all, put, takeLatest } from 'redux-saga/effects';

export default function(vocabApi: import('apis').API['vocab']) {
  function* fetchVocabularies(api: typeof vocabApi) {
    const vocabs = yield api.getVocabularies();
    yield put(actions.setVocabs(vocabs));
  }

  return function*() {
    yield all([
      takeLatest(ActionKey.FETCH_VOCABS, fetchVocabularies, vocabApi)
    ]);
  };
}
