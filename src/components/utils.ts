import { shouldUpdate } from 'recompose';

// tslint:disable-next-line
const deepEqual = require('deep-equal');

export namespace TextFieldFont {
  export const body1 = '0.875rem';
}

export function onlyUpdateWhenDeepEqual<P>() {
  return shouldUpdate<P>((p1, p2) => {
    for (const key of Object.keys(p1)) {
      if (p1[key] instanceof Function || p2[key] instanceof Function) {
        continue;
      }

      if (!deepEqual(p1[key], p2[key])) {
        return true;
      }
    }

    return false;
  });
}
