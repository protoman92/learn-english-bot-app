import apisauce, { ApisauceConfig } from 'apisauce';
import createVocabMeaningApi from './vocab-meaning';
import createVocabularyApi from './vocabulary';

export type Api = Readonly<{
  vocabulary: ReturnType<typeof createVocabularyApi>;
  vocabMeaning: ReturnType<typeof createVocabMeaningApi>;
}>;

export default function(config: Pick<ApisauceConfig, 'baseURL'>): Api {
  const api = apisauce.create(config);
  const vocabMeaning = createVocabMeaningApi(api);
  return { vocabMeaning, vocabulary: createVocabularyApi(api, vocabMeaning) };
}
