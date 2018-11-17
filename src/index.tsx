import { CssBaseline, jssPreset } from '@material-ui/core';
import { getters as UserGetters } from 'actions/user';
import createAPI from 'apis';
import { injectAuthToken, wrapDataOrThrow } from 'apis/wrapper';
import apisauce from 'apisauce';
import App from 'components/app/App';
import AsyncProgress from 'components/async-progress/component';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { create, createGenerateClassName } from 'jss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { JssProvider } from 'react-jss';
import { Provider } from 'react-redux';
import { CombinedState } from 'reducers/types';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import createSagas from 'sagas';
import './index.css';
import rootReducer, { transformStateForPersistence } from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { composeObject } from './utils';

const apiInstance = composeObject(
  wrapDataOrThrow(
    apisauce.create({ baseURL: process.env.REACT_APP_BASE_API_URL })
  ),
  injectAuthToken(() => UserGetters.getAccessToken(store.getState()).value)
);

const appApis = createAPI(apiInstance);
const sagas = createSagas(appApis);
const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();

const store = createStore(
  persistReducer(
    {
      key: 'root',
      storage,
      transforms: [transformStateForPersistence()],
      whitelist: ['main'] as Array<keyof CombinedState>
    },
    rootReducer(history)
  ),
  compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(routerMiddleware(history))
  )
);

const reduxPersistor = persistStore(store);

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
        <PersistGate loading={AsyncProgress()} persistor={reduxPersistor}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </CssBaseline>
  </JssProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
