import { ApisauceInstance } from 'apisauce';
import { VocabMeaning } from 'data';
import { Never } from 'javascriptutilities';
import * as joinUrl from 'url-join';

export default function(api: ApisauceInstance) {
  return {
    async fetchVocabMeanings({ vocab_id }: Readonly<{ vocab_id: unknown }>) {
      return (await api.get<Never<Array<Never<VocabMeaning>>>>(
        joinUrl('vocabularies', `${vocab_id}`, 'meanings')
      )).data;
    }
  };
}
