import { getters } from 'actions/vocab-meaning';
import Item from 'components/vocab-meaning/item/component';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { pure } from 'recompose';
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

const mapStateToProps: MapStateToProps<StateProps, Props, CombinedState> = (
  state,
  { vocabIndex }
) => {
  return {
    itemCount: getters.getAllVocabMeaningCount(state, vocabIndex).value,
    itemIndexes: getters.getAllVocabMeaningIndexes(state, vocabIndex).value
  };
};

export default pure(connect(mapStateToProps)(VocabMeaningList));
