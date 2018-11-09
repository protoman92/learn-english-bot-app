import { Vocab } from 'data';
import { Action } from './types';

type _ActionKey = never;
const rootPath = 'vocab';

function setVocabs(vocabs: Vocab[]): Action<_ActionKey> {
  return {
    path: allVocabPath,
    payload: vocabs,
    type: 'DIRECT_UPDATE'
  };
}

export const allVocabPath = `${rootPath}.all`;
export default { setVocabs };
