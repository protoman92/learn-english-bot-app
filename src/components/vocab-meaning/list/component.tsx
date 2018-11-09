import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { CombinedState } from 'reducers';
import './style.scss';

type StateProps = UndefinedProp<Readonly<{ itemIndexes: number[] }>>;

function VocabMeaningList({ itemIndexes = [] }: StateProps) {
  return (
    <div className="vocab-meaning-container">
      {itemIndexes.map(meaningIndex => (
        <div key={meaningIndex} />
      ))}
    </div>
  );
}

const mapStateToProps: MapStateToProps<
  StateProps,
  {},
  CombinedState
> = state => {
  return { itemIndexes: [] };
};

export default connect(mapStateToProps)(VocabMeaningList);
