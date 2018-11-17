import { WrappedApiInstance } from './types';

export default function(apiInstance: WrappedApiInstance) {
  return {
    async authenticateFacebook(authData: unknown) {
      return apiInstance.post('/auth/facebook', authData);
    }
  };
}
