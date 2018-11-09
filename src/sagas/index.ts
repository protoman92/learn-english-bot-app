import { all } from 'redux-saga/effects';
import createVocabSaga from './vocab';

export default function(api: ReturnType<typeof import('api').default>) {
  return function*() {
    yield all([createVocabSaga(api.vocab)()]);
  };
}
