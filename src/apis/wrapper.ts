import { ApisauceInstance } from 'apisauce';
import { AxiosRequestConfig } from 'axios';
import { Undefined } from 'javascriptutilities';
import { FetchApiParams, UpdateApiParams, WrappedApiInstance } from './types';
import { dataOrThrow } from './utils';

export function wrapDataOrThrow(api: ApisauceInstance): WrappedApiInstance {
  return {
    get: <T>(...args: FetchApiParams) => api.get<T>(...args).then(dataOrThrow),
    patch: <T>(...args: UpdateApiParams) =>
      api.patch<T>(...args).then(dataOrThrow),
    post: <T>(...args: UpdateApiParams) =>
      api.post<T>(...args).then(dataOrThrow)
  };
}

export function injectHeaders(
  api: WrappedApiInstance,
  getHeaders: () => {}
): WrappedApiInstance {
  function appendHeaders(
    config: Undefined<AxiosRequestConfig>
  ): AxiosRequestConfig {
    return {
      ...config,
      headers: { ...(config || {}).headers, ...getHeaders() }
    };
  }

  return {
    get: (url, param, config) => api.get(url, param, appendHeaders(config)),
    patch: (url, data, config) => api.patch(url, data, appendHeaders(config)),
    post: (url, data, config) => api.post(url, data, appendHeaders(config))
  };
}
