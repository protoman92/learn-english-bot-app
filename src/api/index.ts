import apisauce, { ApisauceConfig } from 'apisauce';
import createVocab from './vocab';

export type API = Readonly<{ vocab: ReturnType<typeof createVocab> }>;

export default function(config: Pick<ApisauceConfig, 'baseURL'>): API {
  const api = apisauce.create(config);
  return { vocab: createVocab(api) };
}
