import { all } from 'redux-saga/effects';
import createRouterSaga from './router';
import createVocabularySaga from './vocabulary';

export default function(api: import('apis').Api) {
  return function*() {
    yield all([createRouterSaga()(), createVocabularySaga(api.vocabulary)()]);
  };
}
