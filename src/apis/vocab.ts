import { ApisauceInstance } from 'apisauce';
import * as Bluebird from 'bluebird';
import { Vocab } from 'data';
import { Never } from 'javascriptutilities';

export default function(api: ApisauceInstance) {
  return {
    async getVocabularies() {
      return (await api.get<Never<Array<Never<Vocab>>>>('/vocabularies')).data;
    },

    async saveVocabularies(vocabs: Array<Partial<Vocab>>) {
      return Bluebird.map(vocabs, vocab =>
        api.patch<Partial<Vocab>>('/vocabularies', vocab)
      ).map(response => response.data);
    }
  };
}
