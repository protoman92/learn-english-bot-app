import { ApisauceInstance } from 'apisauce';
import { Vocab } from 'data';
import { Never } from 'javascriptutilities';

export default function(api: ApisauceInstance) {
  return {
    async getVocabularies() {
      return (await api.get<Never<Array<Never<Vocab>>>>('/vocabularies')).data;
    }
  };
}
