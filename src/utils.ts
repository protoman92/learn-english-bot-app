import { DataWithStatus } from 'data';
import { EKVObject } from 'enhanced-key-value-object';
import { Types } from 'javascriptutilities';
export { EKVObject as State };
EKVObject.setDefaultAccessMode('unsafe');

export function isDataWithValidStatus(object: unknown) {
  if (!object) {
    return false;
  }

  if (Types.isInstance<DataWithStatus>(object, 'status')) {
    return object.status !== 'deleted';
  }

  return true;
}

export function handleRoutePathName(pathname: string) {
  return {
    currentUserId: (pathname.match(/\/users\/(.*)/) || [])[1]
  };
}

/**
 * Compose an object with wrappers. Wrapped object from one wrapper becomes
 * input for the next wrapper.
 */
export function composeObject<T>(root: T, ...fns: Array<(root: T) => T>): T {
  let wrapped = root;

  for (const fn of fns) {
    wrapped = fn(wrapped);
  }

  return wrapped;
}
