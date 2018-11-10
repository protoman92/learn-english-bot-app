import { ApisauceInstance } from 'apisauce';
import * as Bluebird from 'bluebird';
import { VocabMeaning } from 'data';
import { Never } from 'javascriptutilities';
import * as joinUrl from 'url-join';

export default function(api: ApisauceInstance) {
  return {
    async fetchVocabMeanings({ vocab_id }: Readonly<{ vocab_id: unknown }>) {
      return (await api.get<Never<Array<Never<VocabMeaning>>>>(
        joinUrl('vocabularies', `${vocab_id}`, 'meanings')
      )).data;
    },

    async saveVocabMeanings(meanings: Array<Partial<VocabMeaning>>) {
      return Bluebird.map(meanings, meaning =>
        api.patch<Partial<VocabMeaning>>('vocab_meanings', meaning)
      ).map(response => response.data);
    }
  };
}
