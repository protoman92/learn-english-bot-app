import { all } from 'redux-saga/effects';
import createVocabSaga from './vocab';

export default function(api: import('apis').API) {
  return function*() {
    yield all([createVocabSaga(api.vocab)()]);
  };
}
