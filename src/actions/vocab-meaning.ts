import { VocabMeaning } from 'data';
import { Never, Objects, Try } from 'javascriptutilities';
import { CombinedState } from 'reducers';
import { isDataWithValidStatus } from 'utils';
import { Action } from './types';
import { path as vocabularyPath } from './vocabulary';

export namespace path {
  export function allVocabMeanings(vocabIndex: number) {
    return vocabularyPath.vocabularyItemProp({
      index: vocabIndex,
      key: 'meanings'
    });
  }

  export function vocabMeaningItem({
    vocabIndex,
    meaningIndex
  }: Readonly<{ vocabIndex: number; meaningIndex: number }>) {
    return `${allVocabMeanings(vocabIndex)}.${meaningIndex}`;
  }

  export function vocabMeaningItemProp(
    args: Parameters<typeof vocabMeaningItem>[0] &
      Readonly<{ key: keyof VocabMeaning }>
  ) {
    return `${vocabMeaningItem(args)}.${args.key}`;
  }
}

export const setters = {
  setVocabMeaningItemProp(
    args: Parameters<typeof path.vocabMeaningItemProp>[0] &
      Readonly<{ value: unknown }>
  ): Action {
    return {
      path: path.vocabMeaningItemProp(args),
      payload: args.value,
      type: ''
    };
  }
};

export const getters = {
  getAllVocabMeanings(
    { main: state }: CombinedState,
    vocabIndex: number
  ): Try<Array<Never<Partial<VocabMeaning>>>> {
    return state
      .objectAtNode(path.allVocabMeanings(vocabIndex))
      .map(meanings => Objects.values(meanings));
  },

  getAllVocabMeaningCount(state: CombinedState, vocabIndex: number) {
    return getters
      .getAllVocabMeanings(state, vocabIndex)
      .map(meanings => meanings.length);
  },

  getAllVocabMeaningIndexes(state: CombinedState, vocabIndex: number) {
    return getters.getAllVocabMeanings(state, vocabIndex).map(meanings =>
      meanings
        .map((meaning, i) => ({ meaning, i }))
        .filter(({ meaning }) => isDataWithValidStatus(meaning))
        .map(({ i }) => i)
    );
  },

  getVocabMeaningItemProp(
    { main: state }: CombinedState,
    args: Parameters<typeof path.vocabMeaningItemProp>[0]
  ) {
    return state.valueAtNode(path.vocabMeaningItemProp(args));
  }
};
