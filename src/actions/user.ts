import { User } from 'data';
import { CombinedState } from 'reducers';
import { Action } from './types';

export namespace path {
  const root = 'user_';
  export const currentUser = `${root}currentUser`;
  export const currentTab = `${root}currentTab`;

  export function currentUserProp(key: keyof User) {
    return `${currentUser}.${key}`;
  }
}

export enum ActionKey {
  AUTHENTICATE_USER = 'USER.AUTHENTICATE_USER'
}

export const setters = {
  authenticateUser(authData: unknown): Action<ActionKey> {
    return {
      path: '',
      payload: authData,
      type: ActionKey.AUTHENTICATE_USER
    };
  },

  setCurrentUserProp({
    key,
    value
  }: Readonly<{ key: keyof User; value: unknown }>): Action<ActionKey> {
    return {
      path: path.currentUserProp(key),
      payload: value,
      type: 'DIRECT_UPDATE'
    };
  },

  setCurrentTab(tabIndex: number) {
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
  }
};
