import { Table, TableBody, TablePagination, TableRow } from '@material-ui/core';
import { TablePaginationProps } from '@material-ui/core/TablePagination';
import { getters, setters } from 'actions/vocabulary';
import {
  onlyUpdateWhenDeepEqual,
  StaticButton,
  StaticCircularProgress,
  StaticDivider,
  StaticTypography
} from 'components/utils';
import Item from 'components/vocabulary/item/component';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, pure } from 'recompose';
import { CombinedState } from 'reducers';
import './style.scss';

type DispatchProps = Readonly<{
  changePageNumber: TablePaginationProps['onChangePage'];
  changeRowsPerPage: TablePaginationProps['onChangeRowsPerPage'];
  fetchVocabularies: () => void;
  saveVocabularies: () => void;
}>;

type StateProps = UndefinedProp<
  Readonly<{
    itemIndexes: number[];
    pageNumber: number;
    rowsPerPage: number;
    showProgress: boolean;
  }>
>;

function VocabularyList({
  itemIndexes = [],
  pageNumber = 0,
  rowsPerPage = itemIndexes.length,
  showProgress,
  changePageNumber,
  changeRowsPerPage,
  saveVocabularies
}: DispatchProps & StateProps) {
  const startIndex = pageNumber * rowsPerPage;
  const chosenIndexes = itemIndexes.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="vocab-container">
      <div className="header-container">
        {['Word', 'Definition', 'Class'].map((header, i) => (
          <span key={i}>
            <StaticTypography align="left" variant="subheading">
              {header}
            </StaticTypography>

            <div className="vertical-divider" />
          </span>
        ))}
      </div>

      <StaticDivider className="header-divider" />

      <div className="vocab-list">
        {chosenIndexes.map(vocabIndex => (
          <span className="item-container" key={vocabIndex}>
            <Item vocabIndex={vocabIndex} />
            <StaticDivider />
          </span>
        ))}
      </div>

      <Table>
        <TableBody>
          <TableRow>
            <TablePagination
              count={itemIndexes.length}
              onChangePage={changePageNumber}
              onChangeRowsPerPage={changeRowsPerPage}
              rowsPerPage={rowsPerPage}
              page={pageNumber}
            />
          </TableRow>
        </TableBody>
      </Table>

      <StaticButton className="confirm-vocab" onClick={saveVocabularies}>
        Save vocabularies
      </StaticButton>

      {showProgress && (
        <div className="progress-container">
          <StaticCircularProgress />
        </div>
      )}
    </div>
  );
}

export default compose<Parameters<typeof VocabularyList>[0], {}>(
  pure,
  connect<StateProps, DispatchProps, {}, CombinedState>(
    state => ({
      itemIndexes: getters.getAllVocabularyIndexes(state).value,
      pageNumber: getters.getPageNumber(state).value,
      rowsPerPage: getters.getRowsPerPage(state).value,
      showProgress: getters.getProgress(state).value
    }),
    dispatch => ({
      changePageNumber: (e, page) => dispatch(setters.setPageNumber(page)),
      changeRowsPerPage: ({ target: { value } }) =>
        dispatch(setters.setRowsPerPage(value)),
      fetchVocabularies: () => dispatch(setters.fetchVocabularies()),
      saveVocabularies: () => dispatch(setters.saveVocabularies())
    })
  ),
  onlyUpdateWhenDeepEqual(),
  lifecycle<Parameters<typeof VocabularyList>[0], {}>({
    componentDidMount() {
      this.props.fetchVocabularies();
    }
  })
)(VocabularyList);
