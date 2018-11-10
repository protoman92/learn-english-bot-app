import { ApisauceInstance } from 'apisauce';
import * as Bluebird from 'bluebird';
import { VocabMeaning, Vocabulary } from 'data';
import { Never, Objects } from 'javascriptutilities';

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
      const updatedVocabs = Bluebird.map(vocabs, vocab =>
        api.patch<Partial<Vocabulary>>('vocabularies', vocab)
      ).map(response => response.data);

      return Bluebird.map(updatedVocabs, async updatedVocab => {
        const preUpdateVocab = vocabs.find(
          ({ id }) => !!updatedVocab && updatedVocab.id === id
        );

        if (!updatedVocab || !preUpdateVocab) {
          return undefined;
        }

        const { id: vocab_id, user_id } = updatedVocab;

        const meanings = Objects.values(preUpdateVocab.meanings || [])
          .filter(meaning => !!meaning)
          .map(meaning => meaning!)
          .map((meaning): VocabMeaning => ({ ...meaning, vocab_id, user_id }));

        const meaningKey: keyof Vocabulary = 'meanings';

        return {
          ...updatedVocab,
          [meaningKey]: await vocabMeaningApi.saveVocabMeanings(meanings)
        };
      });
    }
  };
}
