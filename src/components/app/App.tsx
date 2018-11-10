import VocabList from 'components/vocabulary/list/component';
import logo from 'logo.svg';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import './style.scss';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <Switch>
          <Route exact={true} path={'/users/:id'} component={VocabList} />
        </Switch>
      </div>
    );
  }
}

export default App;
