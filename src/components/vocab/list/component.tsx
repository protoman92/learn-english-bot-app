import { Button, Table, TableBody } from '@material-ui/core';
import { getters, setters } from 'actions/vocab';
import Item from 'components/vocab/item/component';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { lifecycle } from 'recompose';
import { CombinedState } from 'reducers';
import './style.scss';

type DispatchProps = Readonly<{
  fetchVocabs: () => void;
  saveVocabs: () => void;
}>;

type StateProps = UndefinedProp<Readonly<{ itemIndexes: number[] }>>;

function VocabList({
  itemIndexes = [],
  saveVocabs
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

      <Button className="confirm-vocab" onClick={saveVocabs}>
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
  return { itemIndexes: getters.getAllVocabIndexes(state).value };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
  fetchVocabs: () => dispatch(setters.fetchVocabs()),
  saveVocabs: () => dispatch(setters.saveVocabs())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  lifecycle<Parameters<typeof VocabList>[0], {}>({
    componentDidMount() {
      this.props.fetchVocabs();
    }
  })(VocabList)
);
