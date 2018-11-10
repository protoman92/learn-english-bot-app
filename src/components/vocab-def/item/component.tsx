import { TextFieldProps } from '@material-ui/core/TextField';
import { getters, setters } from 'actions/vocab-meaning';
import { MinimalTextField, TextFieldFont } from 'components/utils';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, pure } from 'recompose';
import { CombinedState } from 'reducers';
import './style.scss';

type Props = Readonly<{
  vocabIndex: number;
  meaningIndex: number;
}>;

type DispatchProps = Readonly<{ changeDef: TextFieldProps['onChange'] }>;

type StateProps = UndefinedProp<Readonly<{ def: string }>>;

function VocabMeaningItem({
  changeDef,
  def = ''
}: Props & DispatchProps & StateProps) {
  return (
    <div className="vocab-def-item-container">
      <MinimalTextField
        className="def-input"
        inputProps={{ style: { fontSize: TextFieldFont.body1 } }}
        margin="dense"
        onChange={changeDef}
        placeholder="Enter definition"
        value={def}
      />
    </div>
  );
}

export default compose<Parameters<typeof VocabMeaningItem>[0], Props>(
  pure,
  connect<StateProps, DispatchProps, Props, CombinedState>(
    ({ main: state }, { vocabIndex, meaningIndex }) => ({
      def: getters
        .getVocabMeaningItemProp(state, {
          key: 'def',
          meaningIndex,
          vocabIndex
        })
        .stringOrFail().value
    }),
    (dispatch, { vocabIndex, meaningIndex }) => ({
      changeDef: ({ target: { value } }) =>
        dispatch(
          setters.setVocabMeaningItemProp({
            key: 'def',
            meaningIndex,
            value,
            vocabIndex
          })
        )
    })
  )
)(VocabMeaningItem);
