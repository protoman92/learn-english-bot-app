import { Vocab } from 'data';
import { Action } from './types';

export namespace path {
  export const root = 'vocab';
  export const allVocabs = `${root}.all`;

  export function vocabItem(index: number) {
    return `${allVocabs}.${index}`;
  }

  export function vocabItemProp<V extends Vocab>(index: number, key: keyof V) {
    return `${vocabItem(index)}.${key}`;
  }
}

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
      path: path.allVocabs,
      payload: vocabs,
      type: 'DIRECT_UPDATE'
    };
  }
};
