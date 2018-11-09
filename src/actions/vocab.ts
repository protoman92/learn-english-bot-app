import { Vocab } from 'data';
import { Action } from './types';

export const rootPath = 'vocab';
export const allVocabPath = `${rootPath}.all`;

export enum ActionKey {
  FETCH_VOCABS = 'VOCAB.FETCH_VOCABS'
}

export const actions = {
  fetchVocabs(): Action<ActionKey> {
    return {
      path: '',
      payload: undefined,
      type: ActionKey.FETCH_VOCABS
    };
  },

  setVocabs(vocabs: Vocab[]): Action<ActionKey> {
    return {
      path: allVocabPath,
      payload: vocabs,
      type: 'DIRECT_UPDATE'
    };
  }
};
