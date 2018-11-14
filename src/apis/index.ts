import apisauce, { ApisauceConfig } from 'apisauce';
import createUserApi from './user';
import createVocabMeaningApi from './vocab-meaning';
import createVocabularyApi from './vocabulary';
import { wrapDataOrThrow } from './wrapper';

export type AppApi = Readonly<{
  user: ReturnType<typeof createUserApi>;
  vocabulary: ReturnType<typeof createVocabularyApi>;
  vocabMeaning: ReturnType<typeof createVocabMeaningApi>;
}>;

export default function(config: Pick<ApisauceConfig, 'baseURL'>): AppApi {
  const apiInstance = apisauce.create(config);
  const wrappedApiInstance = wrapDataOrThrow(apiInstance);
  const vocabMeaning = createVocabMeaningApi(wrappedApiInstance);

  return {
    user: createUserApi(wrappedApiInstance),
    vocabMeaning,
    vocabulary: createVocabularyApi(wrappedApiInstance, vocabMeaning)
  };
}
