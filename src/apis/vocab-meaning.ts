import * as Bluebird from 'bluebird';
import { Status, VocabMeaning } from 'data';
import { Never } from 'javascriptutilities';
import { WrappedApiInstance } from './types';

export default function(apiInstance: WrappedApiInstance) {
  return {
    async fetchVocabMeanings({ vocab_id }: Readonly<{ vocab_id: unknown }>) {
      const deletedStatus: Status = 'deleted';

      return apiInstance.get<Array<Never<VocabMeaning>>>('vocab_meanings', {
        filter: JSON.stringify({
          where: { vocab_id, status: { neq: deletedStatus } } as Record<
            keyof VocabMeaning,
            unknown
          >
        })
      });
    },

    async saveVocabMeanings(meanings: Array<Partial<VocabMeaning>>) {
      return Bluebird.map(meanings, meaning =>
        apiInstance.patch<Partial<VocabMeaning>>('vocab_meanings', meaning)
      );
    }
  };
}
