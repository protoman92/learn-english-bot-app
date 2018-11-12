import { ApisauceInstance } from 'apisauce';

export default function(api: ApisauceInstance) {
  return {
    async authenticate(authData: unknown) {
      console.log(authData);
      return undefined;
    }
  };
}
