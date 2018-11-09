import { getters } from 'actions/vocab-meaning';
import { onlyUpdateWhenDeepEqual } from 'components/utils';
import Item from 'components/vocab-meaning/item/component';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, pure } from 'recompose';
import { CombinedState } from 'reducers';
import './style.scss';

type Props = Readonly<{ vocabIndex: number }>;

type StateProps = UndefinedProp<
  Readonly<{ itemCount: number; itemIndexes: number[] }>
>;

function VocabMeaningList({
  vocabIndex,
  itemCount = 0,
  itemIndexes = []
}: Props & StateProps) {
  return (
    <div className="vocab-meaning-container">
      {[...itemIndexes, itemCount].map(meaningIndex => (
        <Item
          key={meaningIndex}
          vocabIndex={vocabIndex}
          meaningIndex={meaningIndex}
          isDummy={meaningIndex === itemCount}
        />
      ))}
    </div>
  );
}

export default compose<Parameters<typeof VocabMeaningList>[0], Props>(
  pure,
  connect<StateProps, {}, Props, CombinedState>((state, { vocabIndex }) => ({
    itemCount: getters.getAllVocabMeaningCount(state, vocabIndex).value,
    itemIndexes: getters.getAllVocabMeaningIndexes(state, vocabIndex).value
  })),
  onlyUpdateWhenDeepEqual()
)(VocabMeaningList);
