import { TableCell, TableRow } from '@material-ui/core';
import { getVocabItemProp } from 'accessors/vocab';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { CombinedState } from 'reducers';

type Props = Readonly<{ vocabIndex: number }>;
type StateProps = UndefinedProp<Readonly<{ word: string }>>;

function VocabItem({ word }: Props & StateProps) {
  return (
    <TableRow>
      <TableCell>{word}</TableCell>
    </TableRow>
  );
}

const mapStateToProps: MapStateToProps<StateProps, Props, CombinedState> = (
  state,
  { vocabIndex }
) => {
  return {
    word: getVocabItemProp(state, vocabIndex, 'word').stringOrFail().value
  };
};

export default connect(mapStateToProps)(VocabItem);
