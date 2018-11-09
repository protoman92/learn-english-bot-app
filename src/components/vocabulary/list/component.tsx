import { Button, Table, TableBody } from '@material-ui/core';
import { getters, setters } from 'actions/vocabulary';
import Item from 'components/vocabulary/item/component';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { lifecycle } from 'recompose';
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
      <Table className="vocab-list" padding="dense">
        <TableBody>
          {itemIndexes.map(vocabIndex => (
            <Item key={vocabIndex} vocabIndex={vocabIndex} />
          ))}
        </TableBody>
      </Table>

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  lifecycle<Parameters<typeof VocabularyList>[0], {}>({
    componentDidMount() {
      this.props.fetchVocabularies();
    }
  })(VocabularyList)
);
