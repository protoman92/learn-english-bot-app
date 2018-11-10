import { Vocabulary } from 'data';
import { Never, Objects, Try } from 'javascriptutilities';
import { isDataWithValidStatus, State } from 'utils';
import { Action } from './types';

export namespace path {
  const root = 'vocab';

  export const allVocabularies = `${root}.all`;

  export function vocabularyItem(index: number) {
    return `${allVocabularies}.${index}`;
  }

  export function vocabularyItemProp({
    index,
    key
  }: Readonly<{ index: number; key: keyof Vocabulary }>) {
    return `${vocabularyItem(index)}.${key}`;
  }
}

export enum ActionKey {
  DELETE_VOCABULARY = 'VOCAB.DELETE_VOCABULARY',
  FETCH_VOCABULARIES = 'VOCAB.FETCH_VOCABS',
  SAVE_VOCABULARIES = 'VOCAB.SAVE_VOCABS'
}

export const setters = {
  deleteVocabulary(vocabIndex: number): Action<ActionKey> {
    return { path: '', payload: vocabIndex, type: ActionKey.DELETE_VOCABULARY };
  },

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

  setVocabularyItemProp(
    args: Parameters<typeof path.vocabularyItemProp>[0] &
      Readonly<{ value: unknown }>
  ): Action<ActionKey> {
    return {
      path: path.vocabularyItemProp(args),
      payload: args.value,
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

  getVocabularyItemProp(
    state: State.Type,
    args: Parameters<typeof path.vocabularyItemProp>[0]
  ) {
    return state.valueAtNode(path.vocabularyItemProp(args));
  }
};
