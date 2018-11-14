import { Action } from 'actions/types';
import { ActionKey, getters, setters } from 'actions/user';
import { parseRawAuthData } from 'actions/utils';
import { AppApi } from 'apis';
import { push } from 'connected-react-router';
import { all, put, select, takeLatest } from 'redux-saga/effects';

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

    const userId: ReturnType<typeof getters.getCurrentUserProp> = yield select(
      getters.getCurrentUserProp,
      'id'
    );

    yield put(push(`/users/${userId.getOrThrow()}`));
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
