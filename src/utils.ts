import { DataWithStatus } from 'data';
import { EKVObject } from 'enhanced-key-value-object';
import { Types } from 'javascriptutilities';
export { EKVObject as State };

export function isDataWithValidStatus(object: unknown) {
  if (!object) {
    return false;
  }

  if (Types.isInstance<DataWithStatus>(object, 'status')) {
    return object.status !== 'deleted';
  }

  return true;
}
