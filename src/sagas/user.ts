import { Action } from 'actions/types';
import { ActionKey, setters } from 'actions/user';
import { parseRawAuthData } from 'actions/utils';
import { AppApi } from 'apis';
import { all, put, takeLatest } from 'redux-saga/effects';

export default function(userApi: AppApi['user']) {
  function* authenticateRawUser({ payload: authData }: Action<ActionKey>) {
    const parsedData: ReturnType<
      typeof parseRawAuthData
    > = yield parseRawAuthData(authData);

    yield put(setters.authenticateParsedUser(parsedData));
  }

  async function switchAuthenticate(
    api: typeof userApi,
    { provider, ...authData }: ReturnType<typeof parseRawAuthData>
  ) {
    switch (provider) {
      case 'facebook':
        return api.authenticateFacebook(authData);
    }
  }

  function* authenticateParsedUser(
    api: typeof userApi,
    { payload }: Action<ActionKey, ReturnType<typeof parseRawAuthData>>
  ) {
    const authResult = yield switchAuthenticate(api, payload);
    yield put(setters.setAuthenticationResult(authResult));
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
