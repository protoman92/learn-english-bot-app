import { setters as UserSetters } from 'actions/user';
import { LOCATION_CHANGE } from 'connected-react-router';
import { Types } from 'javascriptutilities';
import { Action } from 'redux';
import { all, put, takeEvery } from 'redux-saga/effects';
import { handleRoutePathName } from 'utils';

export default function() {
  function* interceptRouting(action: Action) {
    if (
      Types.isInstance(action, 'payload') &&
      Types.isInstance(action.payload, 'location') &&
      Types.isInstance(action.payload.location, 'pathname') &&
      typeof action.payload.location.pathname === 'string'
    ) {
      const { currentUserId } = handleRoutePathName(
        action.payload.location.pathname
      );

      yield put(
        UserSetters.setCurrentUserProp({ key: 'id', value: currentUserId })
      );
    }
  }

  return function*() {
    yield all([takeEvery(LOCATION_CHANGE, interceptRouting)]);
  };
}
