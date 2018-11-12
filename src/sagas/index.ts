import { all } from 'redux-saga/effects';
import createRouterSaga from './router';
import createUserSaga from './user';
import createVocabularySaga from './vocabulary';

export default function(api: import('apis').Api) {
  return function*() {
    yield all([
      createRouterSaga()(),
      createUserSaga(api.user)(),
      createVocabularySaga(api.vocabulary)()
    ]);
  };
}
