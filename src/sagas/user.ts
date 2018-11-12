import { Action } from 'actions/types';
import { ActionKey, setters } from 'actions/user';
import { AppApi } from 'apis';
import { parseRawAuthData } from 'apis/utils';
import { Unpacked } from 'javascriptutilities';
import { all, call, put, takeLatest } from 'redux-saga/effects';

export default function(userApi: AppApi['user']) {
  function* authenticateRawUser({ payload: authData }: Action<ActionKey>) {
    const parsedData = yield parseRawAuthData(authData);
    put(setters.authenticateParsedUser(parsedData));
  }

  function* authenticateParsedUser(
    api: typeof userApi,
    { payload }: Action<ActionKey>
  ) {
    try {
      const authResult: Unpacked<
        ReturnType<typeof api['authenticate']>
      > = yield call(api.authenticate, payload);

      console.log('Auth result', authResult);
    } catch (e) {
      console.log(e);
      yield e;
    }
  }

  return function*() {
    yield all([
      takeLatest(ActionKey.AUTHENTICATE_RAW_USER, authenticateRawUser),
      takeLatest(
        ActionKey.AUTHENTICATE_PARSED_USER,
        authenticateParsedUser,
        userApi
      )
    ]);
  };
}
