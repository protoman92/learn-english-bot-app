import MeaningList from 'components/vocab-meaning/list/component';
import Item from 'components/vocab-pos/item/component';
import * as React from 'react';
import { compose, pure } from 'recompose';

type Props = Pick<
  Required<NonNullable<typeof MeaningList['defaultProps']>>,
  'vocabIndex'
>;

function VocabPosList({ vocabIndex }: Props) {
  return (
    <MeaningList
      className="vocab-pos-list"
      vocabIndex={vocabIndex}
      ChildItem={Item}
    />
  );
}

export default compose<Props, Props>(pure)(VocabPosList);
