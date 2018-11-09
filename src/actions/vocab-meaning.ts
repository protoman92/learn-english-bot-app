import { VocabMeaning } from 'data';
import { Never, Objects, Try } from 'javascriptutilities';
import { isDataWithValidStatus, State } from 'utils';
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

  export function vocabMeaningItemProp<VM extends VocabMeaning>(
    args: Parameters<typeof vocabMeaningItem>[0] & Readonly<{ key: keyof VM }>
  ) {
    return `${vocabMeaningItem(args)}.${args.key}`;
  }
}

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
  }
};
