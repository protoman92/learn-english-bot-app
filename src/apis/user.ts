import { WrappedApiInstance } from './index';

export default function(apiInstance: WrappedApiInstance) {
  return {
    async authenticateFacebook(authData: unknown) {
      return apiInstance.post('/auth/facebook', authData);
    }
  };
}
