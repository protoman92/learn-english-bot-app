import { Action } from 'actions/types';
import { Never, Undefined } from 'javascriptutilities';
import { Predicate } from 'redux-saga';

export function scanPredicate<T>(
  compare: (prev: T, next: T) => boolean
): Predicate<T> {
  let prev: Undefined<T>;

  return next => {
    let passed = false;

    try {
      if (prev !== undefined && prev !== null) {
        passed = compare(prev, next);
      } else {
        passed = true;
      }
    } finally {
      if (passed) {
        prev = next;
      }
    }

    return passed;
  };
}

export function scanActionPredicate<Type, Payload>(
  actionFn: (...args: any[]) => Action<Type, Never<Payload>>,
  actionType: Type,
  compare: (prev: Payload, next: Payload) => boolean
): Predicate<Action<Type, Payload>> {
  return scanPredicate<Action<Type, Never<Payload>>>(
    ({ payload: prev }, { type, payload: next }) =>
      type === actionType &&
      prev !== undefined &&
      prev !== null &&
      next !== undefined &&
      next !== null &&
      compare(prev, next)
  );
}
