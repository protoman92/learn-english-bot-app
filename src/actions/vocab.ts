import { Vocab } from 'data';
import { Never, Objects, Try } from 'javascriptutilities';
import { isDataWithValidStatus, State } from 'utils';
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

export const setters = {
  fetchVocabs(): Action<ActionKey> {
    return { path: '', payload: undefined, type: ActionKey.FETCH_VOCABS };
  },

  setVocabs(vocabs: Vocab[]): Action<ActionKey> {
    return { path: path.allVocabs, payload: vocabs, type: 'DIRECT_UPDATE' };
  },

  setVocabItemProp<V extends Vocab>(
    index: number,
    key: keyof V,
    value: unknown
  ): Action<ActionKey> {
    return {
      path: path.vocabItemProp(index, key),
      payload: value,
      type: 'DIRECT_UPDATE'
    };
  }
};

export const getters = {
  getAllVocabs(state: State.Type): Try<Array<Never<Partial<Vocab>>>> {
    return state
      .objectAtNode(path.allVocabs)
      .map(vocabs => Objects.values(vocabs));
  },

  getAllVocabIndexes(state: State.Type): Try<number[]> {
    return getters.getAllVocabs(state).map(vocabs =>
      vocabs
        .map((vocab, i): [unknown, number] => [vocab, i])
        .filter(([vocab]) => isDataWithValidStatus(vocab))
        .map(([vocab, i]) => i)
    );
  },

  getVocabItemProp<V extends Vocab>(
    state: State.Type,
    index: number,
    key: keyof V
  ) {
    return state.valueAtNode(path.vocabItemProp(index, key));
  }
};
