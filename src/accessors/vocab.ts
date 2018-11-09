import { path } from 'actions/vocab';
import { Vocab } from 'data';
import { Never, Objects, Try } from 'javascriptutilities';
import { isDataWithValidStatus, State } from 'utils';

export function getAllVocabs(
  state: State.Type
): Try<Array<Never<Partial<Vocab>>>> {
  return state
    .objectAtNode(path.allVocabs)
    .map(vocabs => Objects.values(vocabs));
}

export function getAllVocabIndexes(state: State.Type): Try<number[]> {
  return getAllVocabs(state).map(vocabs =>
    vocabs
      .map((vocab, i): [unknown, number] => [vocab, i])
      .filter(([vocab]) => isDataWithValidStatus(vocab))
      .map(([vocab, i]) => i)
  );
}

export function getVocabItemProp<V extends Vocab>(
  state: State.Type,
  index: number,
  key: keyof V
) {
  return state.valueAtNode(path.vocabItemProp(index, key));
}
