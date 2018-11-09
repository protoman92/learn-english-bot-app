import { ApisauceInstance } from 'apisauce';
import * as Bluebird from 'bluebird';
import { Vocabulary } from 'data';
import { Never } from 'javascriptutilities';

export default function(api: ApisauceInstance) {
  return {
    async fetchVocabularies() {
      return (await api.get<Never<Array<Never<Vocabulary>>>>('vocabularies'))
        .data;
    },

    async saveVocabularies(vocabs: Array<Partial<Vocabulary>>) {
      return Bluebird.map(vocabs, vocab =>
        api.patch<Partial<Vocabulary>>('vocabularies', vocab)
      ).map(response => response.data);
    }
  };
}
