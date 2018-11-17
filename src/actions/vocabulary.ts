import { MIN_TABLE_ROWS_PER_PAGE } from 'components/utils';
import { Vocabulary as Vocab } from 'data';
import { Never, Numbers, Objects, Try } from 'javascriptutilities';
import { CombinedState } from 'reducers/types';
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
  }: Readonly<{ index: number; key: keyof Vocab }>) {
    return `${vocabularyItem(index)}.${key}`;
  }
}

export enum ActionKey {
  DELETE_VOCABULARY = 'VOCAB.DELETE_VOCABULARY',
  FETCH_VOCABULARIES = 'VOCAB.FETCH_VOCABS',
  SAVE_VOCABULARIES = 'VOCAB.SAVE_VOCABS',
  SET_ROWS_PER_PAGE = 'VOCAB.SET_ROWS_PER_PAGE',
  SET_PAGE_NUMBER = 'VOCAB.SET_PAGE_NUMBER'
}

export const setters = {
  deleteVocabulary(vocabIndex: number): Action {
    return { path: '', payload: vocabIndex, type: ActionKey.DELETE_VOCABULARY };
  },

  fetchVocabularies(): Action {
    return { path: '', payload: undefined, type: ActionKey.FETCH_VOCABULARIES };
  },

  setPageNumber(page: number): Action<Never<number>> {
    return {
      path: path.pageNumber,
      payload: page,
      type: ActionKey.SET_PAGE_NUMBER
    };
  },

  setRowsPerPage(count: number | string): Action<Never<number>> {
    const payload =
      typeof count === 'number' ? count : Numbers.parseInteger(count);

    return {
      path: path.rowsPerPage,
      payload,
      type: ActionKey.SET_ROWS_PER_PAGE
    };
  },

  saveVocabularies(): Action {
    return { path: '', payload: undefined, type: ActionKey.SAVE_VOCABULARIES };
  },

  setVocabularies(vocabs: Never<Array<Never<Partial<Vocab>>>>): Action {
    return {
      path: path.allVocabularies,
      payload: vocabs,
      type: ''
    };
  },

  setVocabularyItemProp(
    args: Parameters<typeof path.vocabularyItemProp>[0] &
      Readonly<{ value: unknown }>
  ): Action {
    return {
      path: path.vocabularyItemProp(args),
      payload: args.value,
      type: ''
    };
  },

  setProgress(enabled: boolean): Action {
    return {
      path: path.progress,
      payload: enabled,
      type: ''
    };
  }
};

export const getters = {
  getAllVocabularies({ main: state }: CombinedState) {
    return state
      .objectAtNode(path.allVocabularies)
      .map((vocabs): Array<Never<Partial<Vocab>>> => Objects.values(vocabs));
  },

  getAllVocabularyCount(state: CombinedState) {
    return getters.getAllVocabularies(state).map(vocabs => vocabs.length);
  },

  getAllVocabularyIndexes(state: CombinedState): Try<number[]> {
    return getters.getAllVocabularies(state).map(vocabs =>
      vocabs
        .map((vocab, i) => ({ vocab, i }))
        .filter(({ vocab }) => isDataWithValidStatus(vocab))
        .map(({ i }) => i)
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

  getVocabularyFetchCount(args: CombinedState) {
    const rowsPerPage = getters
      .getRowsPerPage(args)
      .getOrElse(MIN_TABLE_ROWS_PER_PAGE);

    const pageNumber = getters.getPageNumber(args).getOrElse(0);
    return rowsPerPage * (pageNumber + 1);
  },

  getProgress({ main: state }: CombinedState) {
    return state.booleanAtNode(path.progress);
  }
};
