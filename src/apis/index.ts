import apisauce, { ApisauceConfig } from 'apisauce';
import createVocabularyAPI from './vocabulary';

export type Api = Readonly<{
  vocabulary: ReturnType<typeof createVocabularyAPI>;
}>;

export default function(config: Pick<ApisauceConfig, 'baseURL'>): Api {
  const api = apisauce.create(config);
  return { vocabulary: createVocabularyAPI(api) };
}
