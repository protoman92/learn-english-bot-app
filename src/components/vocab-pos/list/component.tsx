import MeaningList from 'components/vocab-meaning/list/component';
import Item from 'components/vocab-pos/item/component';
import { Omit } from 'javascriptutilities';
import * as React from 'react';

type Props = Omit<
  Required<NonNullable<typeof MeaningList['defaultProps']>>,
  'ChildItem'
>;

export default function VocabPosList({ vocabIndex }: Props) {
  return <MeaningList vocabIndex={vocabIndex} ChildItem={Item} />;
}