import { Vocabulary } from 'data';
import { Never, Numbers, Objects, Try } from 'javascriptutilities';
import { CombinedState } from 'reducers';
import { extractMainState } from 'reducers/utils';
import { isDataWithValidStatus, State } from 'utils';
import { Action } from './types';

export namespace path {
  const root = 'vocab_';
  export const pageNumber = `${root}pageNumber`;
  export const rowsPerPage = `${root}rowsPerPage`;
  export const progress = `${root}progress`;

  export const allVocabularies = `${root}all`;

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

  setPageNumber(page: number): Action<ActionKey> {
    return { path: path.pageNumber, payload: page, type: 'DIRECT_UPDATE' };
  },

  setRowsPerPage(count: number | string): Action<ActionKey> {
    const payload =
      typeof count === 'number' ? count : Numbers.parseInteger(count);

    return { path: path.rowsPerPage, payload, type: 'DIRECT_UPDATE' };
  },

  saveVocabularies(): Action<ActionKey> {
    return { path: '', payload: undefined, type: ActionKey.SAVE_VOCABULARIES };
  },

  setVocabularies(
    vocabs: Never<Array<Never<Partial<Vocabulary>>>>
  ): Action<ActionKey> {
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
  },

  setProgress(enabled: boolean): Action<ActionKey> {
    return {
      path: path.progress,
      payload: enabled,
      type: 'DIRECT_UPDATE'
    };
  }
};

export const getters = {
  getAllVocabularies({
    main: state
  }: CombinedState): Try<Array<Never<Partial<Vocabulary>>>> {
    return state
      .objectAtNode(path.allVocabularies)
      .map(vocabs => Objects.values(vocabs));
  },

  getAllVocabularyCount(state: CombinedState) {
    return getters.getAllVocabularies(state).map(vocabs => vocabs.length);
  },

  getAllVocabularyIndexes(state: CombinedState): Try<number[]> {
    return getters.getAllVocabularies(state).map(vocabs =>
      vocabs
        .map((vocab, i): [unknown, number] => [vocab, i])
        .filter(([vocab]) => isDataWithValidStatus(vocab))
        .map(([vocab, i]) => i)
    );
  },

  getVocabularyItemProp(
    state: CombinedState | State.Type,
    args: Parameters<typeof path.vocabularyItemProp>[0]
  ) {
    return extractMainState(state).valueAtNode(path.vocabularyItemProp(args));
  },

  getRowsPerPage({ main: state }: CombinedState) {
    return state.numberAtNode(path.rowsPerPage);
  },

  getPageNumber({ main: state }: CombinedState) {
    return state.numberAtNode(path.pageNumber);
  },

  getProgress({ main: state }: CombinedState) {
    return state.booleanAtNode(path.progress);
  }
};
