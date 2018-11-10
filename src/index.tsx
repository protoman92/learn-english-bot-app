import { CssBaseline, jssPreset } from '@material-ui/core';
import createAPI from 'apis';
import App from 'components/app/App';
import { create, createGenerateClassName } from 'jss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { JssProvider } from 'react-jss';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createSagas from 'sagas';
import './index.css';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const api = createAPI({ baseURL: process.env.REACT_APP_BASE_API_URL });
const sagas = createSagas(api);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

if (
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_ENABLE_WDYU === 'true'
) {
  // tslint:disable-next-line
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

ReactDOM.render(
  <JssProvider
    jss={create(
      Object.assign({}, jssPreset(), {
        insertionPoint: 'jss-insertion-point'
      })
    )}
    generateClassName={createGenerateClassName()}
  >
    <CssBaseline>
      <Provider store={store}>
        <App />
      </Provider>
    </CssBaseline>
  </JssProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
