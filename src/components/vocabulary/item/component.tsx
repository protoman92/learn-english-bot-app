import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { getters, setters } from 'actions/vocabulary';
import MeaningList from 'components/vocab-meaning/list/component';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { pure } from 'recompose';
import { CombinedState } from 'reducers';
import './style.scss';

type Props = Readonly<{ vocabIndex: number }>;
type DispatchProps = Readonly<{ changeWord: TextFieldProps['onChange'] }>;
type StateProps = UndefinedProp<Readonly<{ word: string }>>;

function VocabularyItem({
  vocabIndex,
  changeWord,
  word
}: Props & DispatchProps & StateProps) {
  return (
    <div className="vocab-item-container">
      <TextField
        className="word-input"
        margin="dense"
        onChange={changeWord}
        value={word}
      />

      <MeaningList vocabIndex={vocabIndex} />
    </div>
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
