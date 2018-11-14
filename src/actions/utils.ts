import { RawFacebookAuthData } from 'data';
import { JSObject, Types } from 'javascriptutilities';

export function parseRawAuthData(
  authData: unknown
): Readonly<{ provider: 'facebook' }> & JSObject<unknown> {
  if (
    Types.isInstance<RawFacebookAuthData>(
      authData,
      '_provider',
      '_profile',
      '_token'
    ) &&
    authData._provider === 'facebook'
  ) {
    return {
      access_token: authData._token.accessToken,
      profile: authData._profile,
      provider: 'facebook'
    };
  }

  throw new Error(`Auth: Invalid auth data: ${JSON.stringify(authData)}`);
}
