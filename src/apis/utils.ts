import { ApiResponse } from 'apisauce';

export function dataOrThrow<T>({
  ok,
  data,
  originalError,
  config = {}
}: ApiResponse<T>) {
  if (!ok && originalError !== undefined && originalError !== null) {
    throw originalError;
  } else if (data !== undefined && data !== null) {
    return data;
  }

  throw new Error(
    `API: Invalid REST response for config: ${JSON.stringify(
      config
    )} - expected either an error or a valid response body.`
  );
}

export function mapAuthData(authData: unknown) {
  console.log(authData);
  return authData;
}
