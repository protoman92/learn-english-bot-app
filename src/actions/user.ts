import { User } from 'data';
import { CombinedState } from 'reducers';
import { Action } from './types';

export namespace path {
  const root = 'user_';
  export const currentUser = `${root}currentUser`;

  export function currentUserProp(key: keyof User) {
    return `${currentUser}.${key}`;
  }
}

export const setters = {
  setCurrentUserProp({
    key,
    value
  }: Readonly<{ key: keyof User; value: unknown }>): Action<never> {
    return {
      path: path.currentUserProp(key),
      payload: value,
      type: 'DIRECT_UPDATE'
    };
  }
};

export const getters = {
  getCurrentUserProp({ main: state }: CombinedState, key: keyof User) {
    return state.valueAtNode(path.currentUserProp(key));
  }
};
