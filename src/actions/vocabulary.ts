import { Vocabulary } from 'data';
import { Never, Objects, Try } from 'javascriptutilities';
import { isDataWithValidStatus, State } from 'utils';
import { Action } from './types';

export namespace path {
  export const root = 'vocab';
  export const allVocabularies = `${root}.all`;

  export function vocabularyItem(index: number) {
    return `${allVocabularies}.${index}`;
  }

  export function vocabularyItemProp<V extends Vocabulary>(
    index: number,
    key: keyof V
  ) {
    return `${vocabularyItem(index)}.${key}`;
  }
}

export enum ActionKey {
  FETCH_VOCABULARIES = 'VOCAB.FETCH_VOCABS',
  SAVE_VOCABULARIES = 'VOCAB.SAVE_VOCABS'
}

export const setters = {
  fetchVocabularies(): Action<ActionKey> {
    return { path: '', payload: undefined, type: ActionKey.FETCH_VOCABULARIES };
  },

  saveVocabularies(): Action<ActionKey> {
    return { path: '', payload: undefined, type: ActionKey.SAVE_VOCABULARIES };
  },

  setVocabularies(vocabs: Vocabulary[]): Action<ActionKey> {
    return {
      path: path.allVocabularies,
      payload: vocabs,
      type: 'DIRECT_UPDATE'
    };
  },

  setVocabularyItemProp<V extends Vocabulary>(
    index: number,
    key: keyof V,
    value: unknown
  ): Action<ActionKey> {
    return {
      path: path.vocabularyItemProp(index, key),
      payload: value,
      type: 'DIRECT_UPDATE'
    };
  }
};

export const getters = {
  getAllVocabularies(
    state: State.Type
  ): Try<Array<Never<Partial<Vocabulary>>>> {
    return state
      .objectAtNode(path.allVocabularies)
      .map(vocabs => Objects.values(vocabs));
  },

  getAllVocabularyIndexes(state: State.Type): Try<number[]> {
    return getters.getAllVocabularies(state).map(vocabs =>
      vocabs
        .map((vocab, i): [unknown, number] => [vocab, i])
        .filter(([vocab]) => isDataWithValidStatus(vocab))
        .map(([vocab, i]) => i)
    );
  },

  getVocabularyItemProp<V extends Vocabulary>(
    state: State.Type,
    index: number,
    key: keyof V
  ) {
    return state.valueAtNode(path.vocabularyItemProp(index, key));
  }
};
