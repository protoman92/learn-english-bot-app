import { WrappedApiInstance } from './types';
import createUserApi from './user';
import createVocabMeaningApi from './vocab-meaning';
import createVocabularyApi from './vocabulary';

export type AppApi = Readonly<{
  user: ReturnType<typeof createUserApi>;
  vocabulary: ReturnType<typeof createVocabularyApi>;
  vocabMeaning: ReturnType<typeof createVocabMeaningApi>;
}>;

export default function(apiInstance: WrappedApiInstance): AppApi {
  const vocabMeaning = createVocabMeaningApi(apiInstance);

  return {
    user: createUserApi(apiInstance),
    vocabMeaning,
    vocabulary: createVocabularyApi(apiInstance, vocabMeaning)
  };
}
