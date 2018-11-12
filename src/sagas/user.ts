import { Action } from 'actions/types';
import { ActionKey } from 'actions/user';
import { all, call, takeLatest } from 'redux-saga/effects';

export default function(userApi: import('apis').Api['user']) {
  function* authenticateUser(
    api: typeof userApi,
    { payload }: Action<ActionKey>
  ) {
    yield call(api.authenticate, payload);
  }

  return function*() {
    yield all([
      takeLatest(ActionKey.AUTHENTICATE_USER, authenticateUser, userApi)
    ]);
  };
}
