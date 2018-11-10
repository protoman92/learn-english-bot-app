import { TextFieldProps } from '@material-ui/core/TextField';
import { getters, setters } from 'actions/vocab-meaning';
import {
  MinimalTextField,
  StaticMenuItem,
  TextFieldFont
} from 'components/utils';
import { Selectable } from 'data';
import { selectablePoS as allPoS } from 'data/pos';
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

type DispatchProps = Readonly<{ changePos: TextFieldProps['onChange'] }>;

type StateProps = UndefinedProp<
  Readonly<{ pos: string; selectablePoS: Array<Selectable<string>> }>
>;

function VocabMeaningItem({
  changePos,
  pos = '',
  selectablePoS = []
}: Props & DispatchProps & StateProps) {
  return (
    <div className="vocab-pos-item-container">
      <MinimalTextField
        className="pos-input"
        margin="dense"
        onChange={changePos}
        placeholder="Choose part of speech"
        select={true}
        SelectProps={{ style: { fontSize: TextFieldFont.body1 } }}
        value={pos}
      >
        {selectablePoS.map(({ label, value }) => (
          <StaticMenuItem
            key={value}
            dense={true}
            style={{ fontSize: TextFieldFont.body1 }}
            value={value}
          >
            {label}
          </StaticMenuItem>
        ))}
      </MinimalTextField>
    </div>
  );
}

export default compose<Parameters<typeof VocabMeaningItem>[0], Props>(
  pure,
  connect<StateProps, DispatchProps, Props, CombinedState>(
    (state, { vocabIndex, meaningIndex }) => ({
      pos: getters
        .getVocabMeaningItemProp(state, {
          key: 'pos',
          meaningIndex,
          vocabIndex
        })
        .stringOrFail().value,
      selectablePoS: allPoS
    }),
    (dispatch, { vocabIndex, meaningIndex }) => ({
      changePos: ({ target: { value } }) =>
        dispatch(
          setters.setVocabMeaningItemProp({
            key: 'pos',
            meaningIndex,
            value,
            vocabIndex
          })
        )
    })
  )
)(VocabMeaningItem);
