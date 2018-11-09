import { TableCell, TableRow, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { getters, setters } from 'actions/vocabulary';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { pure } from 'recompose';
import { CombinedState } from 'reducers';

type Props = Readonly<{ vocabIndex: number }>;
type DispatchProps = Readonly<{ changeWord: TextFieldProps['onChange'] }>;
type StateProps = UndefinedProp<Readonly<{ word: string }>>;

function VocabularyItem({
  changeWord,
  word
}: Props & DispatchProps & StateProps) {
  return (
    <TableRow>
      <TableCell>
        <TextField onChange={changeWord} value={word} />
      </TableCell>
    </TableRow>
  );
}

const mapStateToProps: MapStateToProps<StateProps, Props, CombinedState> = (
  state,
  { vocabIndex: index }
) => {
  return {
    word: getters
      .getVocabularyItemProp(state, { index, key: 'word' })
      .stringOrFail().value
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = (
  dispatch,
  { vocabIndex: index }
) => ({
  changeWord: ({ target: { value } }) =>
    dispatch(setters.setVocabularyItemProp({ index, value, key: 'word' }))
});

export default pure(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VocabularyItem)
);
