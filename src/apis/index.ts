import apisauce, { ApisauceConfig } from 'apisauce';
import createUserApi from './user';
import createVocabMeaningApi from './vocab-meaning';
import createVocabularyApi from './vocabulary';

export type Api = Readonly<{
  user: ReturnType<typeof createUserApi>;
  vocabulary: ReturnType<typeof createVocabularyApi>;
  vocabMeaning: ReturnType<typeof createVocabMeaningApi>;
}>;

export default function(config: Pick<ApisauceConfig, 'baseURL'>): Api {
  const api = apisauce.create(config);
  const vocabMeaning = createVocabMeaningApi(api);

  return {
    user: createUserApi(api),
    vocabMeaning,
    vocabulary: createVocabularyApi(api, vocabMeaning)
  };
}
