import { WrappedApiInstance } from './index';

export default function(apiInstance: WrappedApiInstance) {
  return {
    async authenticate(authData: unknown) {
      return apiInstance.post('/authenticate', authData);
    }
  };
}
