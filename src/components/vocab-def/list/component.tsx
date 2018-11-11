import Item from 'components/vocab-def/item/component';
import MeaningList from 'components/vocab-meaning/list/component';
import * as React from 'react';
import { compose, pure } from 'recompose';

type Props = Pick<
  Required<NonNullable<typeof MeaningList['defaultProps']>>,
  'vocabIndex'
>;

function VocabDefList({ vocabIndex }: Props) {
  return (
    <MeaningList
      className="vocab-def-list"
      vocabIndex={vocabIndex}
      ChildItem={Item}
    />
  );
}

export default compose<Props, Props>(pure)(VocabDefList);
