import * as Bluebird from 'bluebird';
import { Status, VocabMeaning as Meaning, Vocabulary } from 'data';
import { Never, Objects } from 'javascriptutilities';
import { WrappedApiInstance } from './types';

export default function(
  apiInstance: WrappedApiInstance,
  vocabMeaningApi: ReturnType<typeof import('./vocab-meaning').default>
) {
  return {
    async fetchVocabularies({
      user_id,
      limit
    }: Readonly<{ user_id: unknown; limit?: number }>) {
      const deletedStatus: Status = 'deleted';

      const vocabs = await apiInstance.get<Array<Never<Vocabulary>>>(
        'vocabularies',
        {
          filter: JSON.stringify({
            limit,
            where: { user_id, status: { neq: deletedStatus } } as Record<
              keyof Vocabulary,
              unknown
            >
          })
        }
      );

      return Bluebird.map(vocabs, async vocab => {
        if (!vocab) {
          return null;
        }

        const { id: vocab_id } = vocab;
        const meanings = await vocabMeaningApi.fetchVocabMeanings({ vocab_id });
        const meaningKey: keyof Vocabulary = 'meanings';
        return { ...vocab, [meaningKey]: meanings };
      });
    },

    async saveVocabularies({
      user_id,
      vocabs
    }: Readonly<{ user_id: unknown; vocabs: Array<Partial<Vocabulary>> }>) {
      const userIdKey: keyof Vocabulary = 'user_id';

      return Bluebird.map(vocabs, async vocab => {
        const updatedVocab = await apiInstance.patch<Partial<Vocabulary>>(
          'vocabularies',
          { ...vocab, [userIdKey]: user_id },
          {
            params: { filter: JSON.stringify({ where: { user_id } }) }
          }
        );

        const { id: vocab_id } = updatedVocab;

        const meanings = Objects.values(vocab.meanings || [])
          .filter(meaning => !!meaning)
          .map(meaning => meaning!)
          .map((m): Partial<Meaning> => ({ ...m, user_id, vocab_id }));

        const newMeanings = await vocabMeaningApi.saveVocabMeanings(meanings);
        const meaningKey: keyof Vocabulary = 'meanings';
        return { ...updatedVocab, [meaningKey]: newMeanings };
      });
    }
  };
}
