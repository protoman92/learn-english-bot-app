import { ApisauceInstance } from 'apisauce';
import { dataOrThrow } from './utils';

export default function(api: ApisauceInstance) {
  return {
    async authenticate(authData: unknown) {
      return api.post('/authenticate', authData).then(dataOrThrow);
    }
  };
}
