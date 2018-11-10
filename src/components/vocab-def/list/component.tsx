import Item from 'components/vocab-def/item/component';
import MeaningList from 'components/vocab-meaning/list/component';
import { Omit } from 'javascriptutilities';
import * as React from 'react';
import { compose, pure } from 'recompose';

type Props = Omit<
  Required<NonNullable<typeof MeaningList['defaultProps']>>,
  'ChildItem'
>;

function VocabDefList({ vocabIndex }: Props) {
  return <MeaningList vocabIndex={vocabIndex} ChildItem={Item} />;
}

export default compose<Props, Props>(pure)(VocabDefList);
