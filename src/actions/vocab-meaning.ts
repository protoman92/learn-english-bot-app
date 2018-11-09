import { VocabMeaning } from 'data';
import { Never, Objects, Try } from 'javascriptutilities';
import { isDataWithValidStatus, State } from 'utils';
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
  ): Action<never> {
    return {
      path: path.vocabMeaningItemProp(args),
      payload: args.value,
      type: 'DIRECT_UPDATE'
    };
  }
};

export const getters = {
  getAllVocabMeanings<VM extends VocabMeaning>(
    state: State.Type,
    vocabIndex: number
  ): Try<Array<Never<Partial<VM>>>> {
    return state
      .objectAtNode(path.allVocabMeanings(vocabIndex))
      .map(meanings => Objects.values(meanings));
  },

  getAllVocabMeaningIndexes(state: State.Type, vocabIndex: number) {
    return getters.getAllVocabMeanings(state, vocabIndex).map(meanings =>
      meanings
        .map((meaning, i): [unknown, number] => [meaning, i])
        .filter(([meaning]) => isDataWithValidStatus(meaning))
        .map(([_meaning, i]) => i)
    );
  },

  getVocabMeaningItemProp(
    state: State.Type,
    args: Parameters<typeof path.vocabMeaningItemProp>[0]
  ) {
    return state.valueAtNode(path.vocabMeaningItemProp(args));
  }
};
