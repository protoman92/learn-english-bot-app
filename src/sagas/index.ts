import { all } from 'redux-saga/effects';
import createVocabularySaga from './vocabulary';

export default function(api: import('apis').Api) {
  return function*() {
    yield all([createVocabularySaga(api.vocabulary)()]);
  };
}
