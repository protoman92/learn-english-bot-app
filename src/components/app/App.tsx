import VocabList from 'components/vocab/list/component';
import logo from 'logo.svg';
import * as React from 'react';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Yuki</h1>
        </header>

        <VocabList />
      </div>
    );
  }
}

export default App;
