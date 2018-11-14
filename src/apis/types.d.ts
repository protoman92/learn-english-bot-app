import { ApisauceInstance } from 'apisauce';
export type FetchApiParams = Parameters<ApisauceInstance['get']>;
export type FetchApiFunc = <T>(...args: FetchApiParams) => PromiseLike<T>;
export type UpdateApiParams = Parameters<ApisauceInstance['post']>;
export type UpdateApiFunc = <T>(...args: UpdateApiParams) => PromiseLike<T>;

export type WrappedApiInstance = Record<
  keyof Pick<ApisauceInstance, 'get'>,
  FetchApiFunc
> &
  Record<keyof Pick<ApisauceInstance, 'post' | 'patch'>, UpdateApiFunc>;
