import { ApisauceInstance } from 'apisauce';
import * as Bluebird from 'bluebird';
import { Vocabulary } from 'data';
import { Never } from 'javascriptutilities';

export default function(
  api: ApisauceInstance,
  vocabMeaningApi: ReturnType<typeof import('./vocab-meaning').default>
) {
  return {
    async fetchVocabularies() {
      const vocabs = (await api.get<Never<Array<Never<Vocabulary>>>>(
        'vocabularies'
      )).data;

      if (!vocabs) {
        return null;
      }

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

    async saveVocabularies(vocabs: Array<Partial<Vocabulary>>) {
      return Bluebird.map(vocabs, vocab =>
        api.patch<Partial<Vocabulary>>('vocabularies', vocab)
      ).map(response => response.data);
    }
  };
}
