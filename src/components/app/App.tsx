import AsyncProgress from 'components/async-progress/component';
import logo from 'logo.svg';
import * as React from 'react';
import * as Loadable from 'react-loadable';
import { Route, Switch } from 'react-router';
import './style.scss';

const LoadableLogin = Loadable({
  loader: () => import('components/authentication/login/component'),
  loading: AsyncProgress
});

const LoadableUser = Loadable({
  loader: () => import('components/user/component'),
  loading: AsyncProgress
});

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <Switch>
          <Route exact={true} path={'/login'} component={LoadableLogin} />
          <Route exact={true} path={'/users/:id'} component={LoadableUser} />
        </Switch>
      </div>
    );
  }
}

export default App;
