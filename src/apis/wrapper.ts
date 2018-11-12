import { ApisauceInstance } from 'apisauce';
import { dataOrThrow } from './utils';

type _FetchApiInstance = Pick<ApisauceInstance, 'get'>;
type _UpdateApiInstance = Pick<ApisauceInstance, 'post' | 'patch'>;

export default (
  api: _FetchApiInstance & _UpdateApiInstance
): Record<
  keyof _FetchApiInstance,
  <T>(...args: Parameters<_FetchApiInstance['get']>) => Promise<T>
> &
  Record<
    keyof _UpdateApiInstance,
    <T>(...args: Parameters<_UpdateApiInstance['post']>) => Promise<T>
  > => {
  return {
    get: <T>(...args: Parameters<_FetchApiInstance['get']>) =>
      api.get<T>(...args).then(dataOrThrow),
    patch: <T>(...args: Parameters<_UpdateApiInstance['post']>) =>
      api.patch<T>(...args).then(dataOrThrow),
    post: <T>(...args: Parameters<_UpdateApiInstance['post']>) =>
      api.post<T>(...args).then(dataOrThrow)
  };
};
