import { User } from 'data';
import { CombinedState } from 'reducers';
import { Action } from './types';
import { parseRawAuthData } from './utils';

export namespace path {
  const root = 'user_';
  export const currentUser = `${root}currentUser`;
  export const currentTab = `${root}currentTab`;
  export const accessToken = `${root}accessToken`;

  export function currentUserProp(key: keyof User) {
    return `${currentUser}.${key}`;
  }
}

export enum ActionKey {
  AUTHENTICATE_PARSED_USER = 'USER.AUTHENTICATE_PARSED_USER',
  AUTHENTICATE_RAW_USER = 'USER.AUTHENTICATE_RAW_USER',
  SET_AUTHENTICATION_RESULT = 'USER.SET_AUTHENTICATION_RESULT'
}

export const setters = {
  /**
   * The data that comes in via social login may not be in the correct format.
   * We need an intermediate action to catch this data and a saga to call the
   * appropriate mapper.
   */
  authenticateRawUser(authData: unknown): Action {
    return {
      path: '',
      payload: authData,
      type: ActionKey.AUTHENTICATE_RAW_USER
    };
  },

  authenticateParsedUser(
    authData: ReturnType<typeof parseRawAuthData>
  ): Action<ReturnType<typeof parseRawAuthData>> {
    return {
      path: '',
      payload: authData,
      type: ActionKey.AUTHENTICATE_PARSED_USER
    };
  },

  setAuthenticationResult(result: unknown): Action {
    return {
      path: '',
      payload: result,
      type: ActionKey.SET_AUTHENTICATION_RESULT
    };
  },

  setCurrentUserProp({
    key,
    value
  }: Readonly<{ key: keyof User; value: unknown }>): Action {
    return {
      path: path.currentUserProp(key),
      payload: value,
      type: 'DIRECT_UPDATE'
    };
  },

  setCurrentTab(tabIndex: number): Action {
    return {
      path: path.currentTab,
      payload: tabIndex,
      type: 'DIRECT_UPDATE'
    };
  }
};

export const getters = {
  getCurrentUserProp({ main: state }: CombinedState, key: keyof User) {
    return state.valueAtNode(path.currentUserProp(key));
  },

  getCurrentTab({ main: state }: CombinedState) {
    return state.numberAtNode(path.currentTab);
  },

  getAccessToken({ main: state }: CombinedState) {
    return state.stringAtNode(path.accessToken).stringOrFail();
  }
};
