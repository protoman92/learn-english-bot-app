import { Table, TableBody } from '@material-ui/core';
import { getAllVocabIndexes } from 'accessor/vocab';
import { actions } from 'actions/vocab';
import Item from 'component/vocab/item/component';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { lifecycle } from 'recompose';
import { CombinedState } from 'reducers';

type DispatchProps = Readonly<{ fetchVocabs: () => void }>;
type StateProps = UndefinedProp<Readonly<{ itemIndexes: number[] }>>;

function VocabList({ itemIndexes = [] }: DispatchProps & StateProps) {
  return (
    <Table className="vocab-list-container">
      <TableBody>
        {itemIndexes.map(vocabIndex => (
          <Item vocabIndex={vocabIndex} />
        ))}
      </TableBody>
    </Table>
  );
}

const mapStateToProps: MapStateToProps<
  StateProps,
  {},
  CombinedState
> = state => {
  return { itemIndexes: getAllVocabIndexes(state.vocab).value };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
  fetchVocabs: () => dispatch(actions.fetchVocabs())
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
