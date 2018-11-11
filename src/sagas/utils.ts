import { Action } from 'actions/types';
import { Never, Undefined } from 'javascriptutilities';
import { Predicate } from 'redux-saga';

export function scanActionPredicate<Type, Payload>(
  actionFn: (...args: any[]) => Action<Type, Never<Payload>>,
  actionType: Type,
  compare: (prev: Payload, next: Payload) => boolean
): Predicate<Action<Type, Payload>> {
  let prev: Undefined<Payload>;

  return ({ type: nextType, payload: next }) => {
    let passed = false;

    try {
      if (nextType !== actionType) {
        passed = false;
      } else if (prev !== undefined && prev !== null) {
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
