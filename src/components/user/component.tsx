import { neverUpdate } from 'components/utils';
import VocabList from 'components/vocabulary/list/component';
import * as React from 'react';
import { compose } from 'recompose';
import './style.scss';

function UserPage(props: {}) {
  return (
    <div className="user-container">
      <VocabList />
    </div>
  );
}

export default compose(neverUpdate())(UserPage);
