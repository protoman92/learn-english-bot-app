import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { getVocabIndexes } from 'accessor/vocab';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { CombinedState } from 'reducers';
import './style.scss';

function VocabList({
  itemIndexes = [1, 2, 3]
}: UndefinedProp<Readonly<{ itemIndexes: number[] }>>) {
  return (
    <Table className="vocab-list-container">
      <TableBody>
        {itemIndexes.map(vocabIndex => (
          <TableRow key={vocabIndex}>
            <TableCell>{vocabIndex}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const mapStateToProps: MapStateToProps<
  Parameters<typeof VocabList>[0],
  {},
  CombinedState
> = state => {
  return { itemIndexes: getVocabIndexes(state.vocab).value };
};

export default connect(mapStateToProps)(VocabList);
