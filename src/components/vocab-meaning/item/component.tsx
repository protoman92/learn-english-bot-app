import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { getters, setters } from 'actions/vocab-meaning';
import { TextFieldFont } from 'components/utils';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { pure } from 'recompose';
import { CombinedState } from 'reducers';
import './style.scss';

type Props = Readonly<{
  vocabIndex: number;
  meaningIndex: number;
  isDummy: boolean;
}>;

type DispatchProps = Readonly<{ changeDef: TextFieldProps['onChange'] }>;
type StateProps = UndefinedProp<Readonly<{ def: string }>>;

function VocabMeaningItem({
  changeDef,
  def = ''
}: Props & DispatchProps & StateProps) {
  return (
    <div className="vocab-meaning-item-container">
      <TextField
        className="def-input"
        inputProps={{ style: { fontSize: TextFieldFont.body1 } }}
        margin="dense"
        onChange={changeDef}
        placeholder="Enter definition"
        value={def}
      />

      <div className="pos-input" />
    </div>
  );
}

const mapStateToProps: MapStateToProps<StateProps, Props, CombinedState> = (
  state,
  { vocabIndex, meaningIndex }
) => {
  return {
    def: getters
      .getVocabMeaningItemProp(state, { vocabIndex, meaningIndex, key: 'def' })
      .stringOrFail().value
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = (
  dispatch,
  { vocabIndex, meaningIndex }
) => ({
  changeDef: ({ target: { value } }) =>
    dispatch(
      setters.setVocabMeaningItemProp({
        key: 'def',
        meaningIndex,
        value,
        vocabIndex
      })
    )
});

export default pure(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VocabMeaningItem)
);
