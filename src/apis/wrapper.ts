import { AxiosRequestConfig } from 'axios';
import { Undefined } from 'javascriptutilities';
import {
  ApiInstance,
  FetchApiParams as FetchParams,
  UpdateApiParams as UpdateParams,
  WrappedApiInstance
} from './types';
import { dataOrErr } from './utils';

export function wrapDataOrThrow(api: ApiInstance): WrappedApiInstance {
  return {
    get: <T>(...args: FetchParams) => api.get<T>(...args).then(dataOrErr),
    patch: <T>(...args: UpdateParams) => api.patch<T>(...args).then(dataOrErr),
    post: <T>(...args: UpdateParams) => api.post<T>(...args).then(dataOrErr)
  };
}

export function injectHeaders(
  getHeaders: () => {}
): (apiInstance: WrappedApiInstance) => WrappedApiInstance {
  function appendHeaders(
    config: Undefined<AxiosRequestConfig> = {}
  ): AxiosRequestConfig {
    return { ...config, headers: { ...config.headers, ...getHeaders() } };
  }

  return api => ({
    get: (url, param, config) => api.get(url, param, appendHeaders(config)),
    patch: (url, data, config) => api.patch(url, data, appendHeaders(config)),
    post: (url, data, config) => api.post(url, data, appendHeaders(config))
  });
}

export function injectAuthToken(getToken: () => Undefined<string>) {
  return injectHeaders(() => ({ authorization: getToken() }));
}
