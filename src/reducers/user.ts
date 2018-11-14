import { ActionKey, path } from 'actions/user';
import { AuthResult } from 'data';
import { Types } from 'javascriptutilities';
import { OptionalReducer } from './types';

const _setAuthenticationResult: OptionalReducer = (state, { payload }) => {
  if (Types.isInstance<AuthResult>(payload, 'accessToken', 'user')) {
    return state
      .updatingValue(path.currentUser, payload.user)
      .updatingValue(path.accessToken, payload.accessToken);
  }

  return undefined;
};

const _: OptionalReducer = (state, action) => {
  switch (action.type) {
    case ActionKey.SET_AUTHENTICATION_RESULT:
      return _setAuthenticationResult(state, action);
  }

  return undefined;
};

export default _;
