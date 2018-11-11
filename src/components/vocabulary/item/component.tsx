import { Hidden } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { Delete } from '@material-ui/icons';
import { getters, setters } from 'actions/vocabulary';
import {
  MinimalTextField,
  StaticIconButton,
  TextFieldFont
} from 'components/utils';
import DefList from 'components/vocab-def/list/component';
import PosList from 'components/vocab-pos/list/component';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, pure } from 'recompose';
import { CombinedState } from 'reducers';
import './style.scss';

type Props = Readonly<{ vocabIndex: number }>;

type DispatchProps = Readonly<{
  changeWord: TextFieldProps['onChange'];
  deleteVocab: () => void;
}>;

type StateProps = UndefinedProp<Readonly<{ word: string }>>;

function VocabularyItem({
  vocabIndex,
  changeWord,
  deleteVocab,
  word = ''
}: Props & DispatchProps & StateProps) {
  return (
    <div className="vocab-item-container">
      <MinimalTextField
        className="word-input"
        inputProps={{ style: { fontSize: TextFieldFont.body1 } }}
        margin="dense"
        onChange={changeWord}
        placeholder={'Enter word'}
        value={word}
      />

      <div className="vertical-divider" />
      <DefList vocabIndex={vocabIndex} />
      <PosList vocabIndex={vocabIndex} />

      <Hidden xsDown={true}>
        <StaticIconButton className="delete-icon" onClick={deleteVocab}>
          <Delete />
        </StaticIconButton>
      </Hidden>
    </div>
  );
}

export default compose<Parameters<typeof VocabularyItem>[0], Props>(
  pure,
  connect<StateProps, DispatchProps, Props, CombinedState>(
    (state, { vocabIndex: index }) => ({
      word: getters
        .getVocabularyItemProp(state, { index, key: 'word' })
        .stringOrFail().value
    }),
    (dispatch, { vocabIndex: index }) => ({
      changeWord: ({ target: { value } }) =>
        dispatch(setters.setVocabularyItemProp({ index, value, key: 'word' })),
      deleteVocab: () => dispatch(setters.deleteVocabulary(index))
    })
  )
)(VocabularyItem);
