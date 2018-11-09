import { getters } from 'actions/vocab-meaning';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { pure } from 'recompose';
import { CombinedState } from 'reducers';
import './style.scss';

type Props = Readonly<{ vocabIndex: number }>;
type StateProps = UndefinedProp<Readonly<{ itemIndexes: number[] }>>;

function VocabMeaningList({ itemIndexes = [] }: Props & StateProps) {
  return (
    <div className="vocab-meaning-container">
      {itemIndexes.map(meaningIndex => (
        <div key={meaningIndex} />
      ))}
    </div>
  );
}

const mapStateToProps: MapStateToProps<StateProps, Props, CombinedState> = (
  state,
  { vocabIndex }
) => {
  return {
    itemIndexes: getters.getAllVocabMeaningIndexes(state, vocabIndex).value
  };
};

export default pure(connect(mapStateToProps)(VocabMeaningList));
