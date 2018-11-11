import { TabsProps } from '@material-ui/core/Tabs';
import { getters, setters } from 'actions/user';
import {
  MinimalSwipeableViews,
  MinimalTab,
  MinimalTabs,
  neverUpdate,
  StaticDivider
} from 'components/utils';
import VocabList from 'components/vocabulary/list/component';
import { UndefinedProp } from 'javascriptutilities';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { CombinedState } from 'reducers';
import './style.scss';

type DispatchProps = Readonly<{ changeTab: TabsProps['onChange'] }>;
type StateProps = Readonly<UndefinedProp<{ tabIndex: number }>>;

function UserPage({ changeTab, tabIndex = 0 }: DispatchProps & StateProps) {
  return (
    <div className="user-container">
      <MinimalTabs
        fullWidth={true}
        indicatorColor="primary"
        textColor="primary"
        onChange={changeTab}
        value={tabIndex}
      >
        <MinimalTab label="Vocabularies" />
        <MinimalTab label="Vocab tests" />
      </MinimalTabs>

      <StaticDivider />

      <MinimalSwipeableViews index={tabIndex}>
        <VocabList />
        <div />
      </MinimalSwipeableViews>
    </div>
  );
}

export default compose<Parameters<typeof UserPage>[0], {}>(
  neverUpdate(),
  connect<StateProps, DispatchProps, {}, CombinedState>(
    state => ({
      tabIndex: getters.getCurrentTab(state).value
    }),
    dispatch => ({
      changeTab: (e, index) => dispatch(setters.setCurrentTab(index))
    })
  )
)(UserPage);
