import { ApisauceInstance } from 'apisauce';
import * as Bluebird from 'bluebird';
import { Status, VocabMeaning } from 'data';
import { Never } from 'javascriptutilities';

export default function(api: ApisauceInstance) {
  return {
    async fetchVocabMeanings({ vocab_id }: Readonly<{ vocab_id: unknown }>) {
      const deletedStatus: Status = 'deleted';

      return (await api.get<Never<Array<Never<VocabMeaning>>>>(
        'vocab_meanings',
        {
          filter: JSON.stringify({
            where: { vocab_id, status: { neq: deletedStatus } } as Record<
              keyof VocabMeaning,
              unknown
            >
          })
        }
      )).data;
    },

    async saveVocabMeanings(meanings: Array<Partial<VocabMeaning>>) {
      return Bluebird.map(meanings, meaning =>
        api.patch<Partial<VocabMeaning>>('vocab_meanings', meaning)
      ).map(response => response.data);
    }
  };
}
