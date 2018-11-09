import { allVocabPath } from 'actions/vocab';
import { Vocab } from 'data';
import { Never, Objects, Try } from 'javascriptutilities';
import { isDataWithValidStatus, State } from 'utils';

function getVocabs(state: State.Type): Try<Array<Never<Partial<Vocab>>>> {
  return state.objectAtNode(allVocabPath).map(vocabs => Objects.values(vocabs));
}

function getVocabIndexes(state: State.Type): Try<number[]> {
  return getVocabs(state).map(vocabs =>
    vocabs
      .map((vocab, i): [unknown, number] => [vocab, i])
      .filter(([vocab]) => isDataWithValidStatus(vocab))
      .map(([vocab, i]) => i)
  );
}

export { getVocabs, getVocabIndexes };
