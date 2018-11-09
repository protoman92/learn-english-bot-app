import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { getters, setters } from 'actions/vocab-meaning';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { pure } from 'recompose';
import { CombinedState } from 'reducers';
import './style.scss';

type Props = Readonly<{ vocabIndex: number; meaningIndex: number }>;
type DispatchProps = Readonly<{ changeDef: TextFieldProps['onChange'] }>;
type StateProps = UndefinedProp<Readonly<{ def: string }>>;

function VocabMeaningItem({
  vocabIndex,
  changeDef,
  def
}: Props & DispatchProps & StateProps) {
  return (
    <div className="vocab-meaning-item-container">
      <TextField margin="dense" onChange={changeDef} value={def} />
    </div>
  );
}

const mapStateToProps: MapStateToProps<StateProps, Props, CombinedState> = (
  state,
  props
) => {
  return {
    def: getters
      .getVocabMeaningItemProp(state, { ...props, key: 'def' })
      .stringOrFail().value
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = (
  dispatch,
  props
) => ({
  changeDef: ({ target: { value } }) =>
    dispatch(setters.setVocabMeaningItemProp({ ...props, value, key: 'def' }))
});

export default pure(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VocabMeaningItem)
);
