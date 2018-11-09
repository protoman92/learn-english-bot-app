import { Button, Divider, Typography } from '@material-ui/core';
import { getters, setters } from 'actions/vocabulary';
import { onlyUpdateWhenDeepEqual } from 'components/utils';
import Item from 'components/vocabulary/item/component';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { lifecycle, pure } from 'recompose';
import { CombinedState } from 'reducers';
import './style.scss';

type DispatchProps = Readonly<{
  fetchVocabularies: () => void;
  saveVocabularies: () => void;
}>;

type StateProps = UndefinedProp<Readonly<{ itemIndexes: number[] }>>;

function VocabularyList({
  itemIndexes = [],
  saveVocabularies
}: DispatchProps & StateProps) {
  return (
    <div className="vocab-container">
      <div className="header-container">
        {['Word', 'Definition', 'Part of Speech'].map((header, i) => (
          <Typography key={i} align="left" variant="subheading">
            {header}
          </Typography>
        ))}
      </div>

      <Divider className="header-divider" />

      <div className="vocab-list">
        {itemIndexes.map(vocabIndex => (
          <span className="item-container" key={vocabIndex}>
            <Item vocabIndex={vocabIndex} />
            <Divider />
          </span>
        ))}
      </div>

      <Button className="confirm-vocab" onClick={saveVocabularies}>
        Save vocabularies
      </Button>
    </div>
  );
}

const mapStateToProps: MapStateToProps<
  StateProps,
  {},
  CombinedState
> = state => {
  return { itemIndexes: getters.getAllVocabularyIndexes(state).value };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
  fetchVocabularies: () => dispatch(setters.fetchVocabularies()),
  saveVocabularies: () => dispatch(setters.saveVocabularies())
});

export default pure(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    onlyUpdateWhenDeepEqual()(
      lifecycle<Parameters<typeof VocabularyList>[0], {}>({
        componentDidMount() {
          this.props.fetchVocabularies();
        }
      })(VocabularyList)
    )
  )
);
